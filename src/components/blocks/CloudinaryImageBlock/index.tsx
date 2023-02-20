import * as React from 'react';
import classNames from 'classnames';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';

export default function CloudinaryImageBlock(props) {
    const { elementId, className, imageClassName, image, altText = '', styles = {} } = props;
    const imageItem = image?.[0];
    const imageUrl = imageItem?.secure_url || imageItem?.original_secure_url;
    if (!imageUrl) {
        return null;
    }
    const fieldPath = props['data-sb-field-path'];
    const annotations = fieldPath
        ? {
              'data-sb-field-path': [
                  fieldPath,
                  `${fieldPath}.image#@src`,
                  `${fieldPath}.altText#@alt`,
                  `${fieldPath}.elementId#@id`
              ]
                  .join(' ')
                  .trim()
          }
        : {};

    return (
        <div
            className={classNames(
                'sb-component',
                'sb-component-block',
                'sb-component-image-block',
                className,
                styles?.self?.margin ? mapStyles({ margin: styles?.self?.margin }) : undefined
            )}
            {...annotations}
        >
            <img
                id={elementId}
                className={classNames(
                    imageClassName,
                    styles?.self?.padding ? mapStyles({ padding: styles?.self?.padding }) : undefined,
                    styles?.self?.borderWidth &&
                        styles?.self?.borderWidth !== 0 &&
                        styles?.self?.borderStyle !== 'none'
                        ? mapStyles({
                              borderWidth: styles?.self?.borderWidth,
                              borderStyle: styles?.self?.borderStyle,
                              borderColor: styles?.self?.borderColor ?? 'border-primary'
                          })
                        : undefined,
                    styles?.self?.borderRadius
                        ? mapStyles({ borderRadius: styles?.self?.borderRadius })
                        : undefined
                )}
                src={imageUrl}
                alt={altText}
            />
        </div>
    );
}
