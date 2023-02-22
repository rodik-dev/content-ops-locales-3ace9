import * as React from 'react';
import { useRouter } from "next/router";
import Markdown from 'markdown-to-jsx';
import classNames from 'classnames';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { Social, Action, Link } from '../../atoms';
import ImageBlock from '../../blocks/ImageBlock';

export default function Footer(props) {
    const {
        colors = 'bg-light-fg-dark',
        logo,
        title,
        text,
        primaryLinks,
        secondaryLinks,
        socialLinks = [],
        legalLinks = [],
        copyrightText,
        styles = {}
    } = props;
    const router = useRouter();
    return (
        <footer
            className={classNames(
                'sb-component',
                'sb-component-footer',
                colors,
                styles?.self?.margin ? mapStyles({ padding: styles?.self?.margin }) : undefined,
                styles?.self?.padding ? mapStyles({ padding: styles?.self?.padding }) : 'px-4 py-28'
            )}
            data-sb-object-id={props['data-sb-object-id']}
        >
            <div className="mx-auto max-w-7xl">
                <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-8">
                    {(logo?.url || title || text) && (
                        <div className="pb-8 sm:col-span-3 lg:col-auto">
                            {(logo?.url || title) && (
                                <Link href="/" className="flex flex-col items-start">
                                    {logo && (
                                        <ImageBlock
                                            {...logo}
                                            className="inline-block w-auto"
                                            data-sb-field-path=".logo"
                                        />
                                    )}
                                    {title && (
                                        <div className="h4" data-sb-field-path=".title">
                                            {title}
                                        </div>
                                    )}
                                </Link>
                            )}
                            {text && (
                                <Markdown
                                    options={{ forceBlock: true, forceWrapper: true }}
                                    className={classNames('sb-markdown', 'text-sm', {
                                        'mt-4': title || logo?.url
                                    })}
                                    data-sb-field-path=".text"
                                >
                                    {text}
                                </Markdown>
                            )}
                        </div>
                    )}
                    {primaryLinks && (
                        <FooterLinksGroup {...primaryLinks} data-sb-field-path=".primaryLinks" />
                    )}
                    {secondaryLinks && (
                        <FooterLinksGroup {...secondaryLinks} data-sb-field-path=".secondaryLinks" />
                    )}
                    <div className="pb-6">
                        <div className="container mx-auto px-5">
                            <div className="p-8 pb-28 items-center">
                                <div className="text-sm text-gray-500">Language</div>
                                <div className="py-2">
                                    {router.locales && (
                                        <div className="inline-block relative w-64">
                                            <select
                                                value={router.locale}
                                                onChange={(e) => {
                                                    const locale = e.target.value;
                                                    router.push(router.asPath, null, { locale });
                                                    console.log('window.stackbit?', window.stackbit);
                                                    (window as any).stackbit?.setLocale(locale);
                                                }}
                                                className="block appearance-none w-full bg-white text-black border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                            >
                                                {router.locales.map((lang) => {
                                                    return (
                                                        <option
                                                            value={lang}
                                                            // disabled={!Boolean(props.translations[lang])}
                                                            key={lang}
                                                        >
                                                            {lang}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg
                                                    className="fill-current h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {socialLinks.length > 0 && (
                            <ul className="flex flex-wrap items-center" data-sb-field-path=".socialLinks">
                                {socialLinks.map((link, index) => (
                                    <li key={index} className="text-2xl mb-2 mr-8 lg:mr-12 last:mr-0">
                                        <Social {...link} data-sb-field-path={`.${index}`} />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                {(copyrightText || legalLinks.length > 0) && (
                    <div className="sb-footer-bottom border-t pt-8 mt-16 flex flex-col sm:flex-row sm:flex-wrap sm:justify-between">
                        {legalLinks.length > 0 && (
                            <ul className="flex flex-wrap mb-3" data-sb-field-path=".legalLinks">
                                {legalLinks.map((link, index) => (
                                    <li key={index} className="mb-1 mr-6 last:mr-0">
                                        <Action
                                            {...link}
                                            className="text-sm"
                                            data-sb-field-path={`.${index}`}
                                        />
                                    </li>
                                ))}
                            </ul>
                        )}
                        {copyrightText && (
                            <Markdown
                                options={{ forceInline: true, forceWrapper: true, wrapper: 'p' }}
                                className={classNames('sb-markdown', 'text-sm', 'mb-4', {
                                    'sm:order-first sm:mr-12': legalLinks.length > 0
                                })}
                                data-sb-field-path=".copyrightText"
                            >
                                {copyrightText}
                            </Markdown>
                        )}
                    </div>
                )}
            </div>
        </footer>
    );
}

function FooterLinksGroup(props) {
    const { title, links = [], 'data-sb-field-path': fieldPath } = props;
    if (links.length === 0) {
        return null;
    }
    return (
        <div className="pb-8" data-sb-field-path={fieldPath}>
            {title && (
                <h2 className="uppercase text-base tracking-wide" data-sb-field-path=".title">
                    {title}
                </h2>
            )}
            {links.length > 0 && (
                <ul className={classNames('space-y-3', { 'mt-7': title })} data-sb-field-path=".links">
                    {links.map((link, index) => (
                        <li key={index}>
                            <Action {...link} className="text-sm" data-sb-field-path={`.${index}`} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
