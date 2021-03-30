export interface Theme {
    name: string;
    theme: ThemeType;
    color_theme: ColorType;
}

export type ThemeType = 'azure' | 'sanguine' | 'draconic';
export type ColorType = 'light' | 'dark';
