import React from 'react';
export declare const jsx: (type: any, props: any, ...children: any[]) => any;
export declare const Context: React.Context<{
    __EMOTION_VERSION__: any;
    theme: any;
}>;
export declare const useThemeUI: () => {
    __EMOTION_VERSION__: any;
    theme: any;
};
export declare const merge: {
    (a: any, b: any): unknown;
    all(...args: any[]): object;
};
export declare const ThemeProvider: ({ theme, children }: {
    theme: any;
    children: any;
}) => any;
