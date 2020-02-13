import React from 'react';
import { Theme } from './theme';
export declare const jsx: typeof React.createElement;
export declare const Context: React.Context<{
    __EMOTION_VERSION__: string;
    theme: Theme;
}>;
export declare const useThemeUI: () => {
    __EMOTION_VERSION__: string;
    theme: Theme;
};
export declare const merge: {
    (a: any, b: any): unknown;
    all(...args: any[]): object;
};
export interface ThemeProviderProps {
    theme: Partial<Theme> | ((outerTheme: Theme) => Theme);
    children?: React.ReactNode;
}
export declare function ThemeProvider({ theme, children }: ThemeProviderProps): React.FunctionComponentElement<{
    context: any;
    children: any;
}>;
