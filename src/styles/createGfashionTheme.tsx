import { createMuiTheme, ThemeOptions } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    appDrawer: {
      width: React.CSSProperties['width'],

    }
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    appDrawer?: {
      width?: React.CSSProperties['width']
    }
  }
}

declare module '@material-ui/core/styles/createPalette' {
  interface TypeBackground {
    productDetail: string;
    footer: string;
    designerHeaderLighter: string;
    designerHeaderDeeper: string;
  }
}

declare module '@material-ui/core/styles/createTypography' {
  type GfashionVariant =
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'button'
    | 'overline'
    | 'homeSectionTitle'
    | 'homeSectionDescription';

  interface Typography extends Record<GfashionVariant, TypographyStyle>, FontStyle, TypographyUtils { }

  interface TypographyOptions extends Partial<Record<GfashionVariant, TypographyStyleOptions> & FontStyleOptions> { }
}

export default function createMyTheme(options: ThemeOptions) {
  return createMuiTheme({
    appDrawer: {
      width: 225
    },
    ...options,
  })
}