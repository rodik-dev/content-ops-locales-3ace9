import { AnalyticsEvent, REALTIME_EVENT_PREFIX } from './types';
import md5 from 'md5';

export function sendGaEvent(eventName: string, properties = {}) {
    try {
        console.log('Sending GA event:', eventName, properties); //TODO remove
        gtag('event', eventName, properties);
    } catch (e) {
        console.error(e);
    }
}

export function realtimeEventName(
    path: string,
    eventType: AnalyticsEvent | null = null,
    componentId: string | null = null
) {
    let pathId: string;
    if (path === '/') {
        pathId = 'hp';
    } else {
        const pathHash = md5(path);
        pathId = path.replace(/[\W_]+/g, '').slice(0, 8) + '_' + pathHash.slice(0, 8);
    }

    let result = `${REALTIME_EVENT_PREFIX}_${pathId}`;
    if (eventType) result += `_${eventType}`;
    if (componentId) {
        const componentHash = componentId ? md5(componentId).slice(0, 8) : '';
        result += `_${componentHash}`;
    }
    return result;
}
