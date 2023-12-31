export interface MenuItem {
    pageName: string;
    pageLink: string;
}

export interface InspirationalItem {
    mainTitle: string,
    secondaryTitle: string,
    secondaryParagraph: string,
    tertiaryTitle: string,
    tertiaryParagraph: string,
    image: string,
    imageAlt: string
}

export interface FooterItem {
    pageName: string;
    pageLink: string;
}

export interface ArticleItem {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    isPrincipal: boolean;
}

export interface DepoimentItem {
    id: number;
    name: string;
    avatar: string;
    comment: string;
}