import { midi } from './midi';

export function getOutput() {
    const outputs = Array.from(midi?.outputs.values() || []);
    const td3 = outputs.find(({ name }) => name.startsWith('TD-3'));
    return {
        td3: {
            channel: 0,
            send: td3
                ? (data: any) => td3.send(data)
                : (data: any) =>
                      console.log('td3 not available to send:', data),
        },
    };
}
