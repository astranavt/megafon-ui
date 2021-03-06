import React, { Ref } from 'react';
import * as PropTypes from 'prop-types';
import './ButtonBanner.less';
import {
    Button,
    cnCreate,
    Grid,
    GridColumn,
    Header,
    Paragraph,
    TextLink,
    convert,
    dataAttrs as filterDataAttrs,
} from '@megafon/ui-core';

export const ButtonColor = {
    GREEN: 'green',
    PURPLE: 'purple',
} as const;
type ButtonColorType = typeof ButtonColor[keyof typeof ButtonColor];

export const ButtonTarget = {
    SELF: '_self',
    BLANK: '_blank',
} as const;
type ButtonTargetType = typeof ButtonTarget[keyof typeof ButtonTarget];

export interface IButtonBannerProps {
    /** Дата атрибуты для корневого элемента */
    dataAttrs?: { [key: string]: string };
    /** Дополнительный css класс для корневого элемента */
    className?: string;
    /** Дополнительный css классы для корневого и внутренних элементов */
    classes?: {
        root?: string;
        button?: string;
    };
    /** Ссылка на корневой элемент */
    rootRef?: Ref<HTMLDivElement>;
    /** Заголовок */
    title: string;
    /** Текст */
    text: string;
    /** URL изображения */
    imageUrl?: string;
    /** Текст кнопки */
    buttonText: string;
    /** URL кнопки */
    buttonUrl?: string;
    /** Target - свойство тега <a> */
    buttonTarget?: ButtonTargetType;
    /** Цвет кнопки */
    buttonColor?: ButtonColorType;
    /** Обработчик клика по кнопке */
    onButtonClick?: (e: React.SyntheticEvent<EventTarget>) => void;
}

const getMediaStyle = (imageUrl: string) => imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined;
const convertConfig = {
    a: {
        component: TextLink,
        props: ['href', 'target'],
    },
};

const cn = cnCreate('mfui-beta-button-banner');
const ButtonBanner: React.FC<IButtonBannerProps> = ({
    dataAttrs,
    className,
    classes = {},
    rootRef,
    title,
    text,
    imageUrl = '',
    buttonText,
    buttonUrl,
    buttonTarget = '_self',
    buttonColor = 'green',
    onButtonClick,
}) => {
    const buttonElem = (
        <Button
            className={cn('button', [classes.button])}
            href={buttonUrl}
            target={buttonTarget}
            theme={buttonColor}
            onClick={onButtonClick}
        >
            {buttonText}
        </Button>
    );

    return (
        <div
            {...filterDataAttrs(dataAttrs)}
            className={cn({ image: !!imageUrl }, [className, classes.root])}
            ref={rootRef}
        >
           <Grid guttersLeft="medium">
               <GridColumn all="6" mobile="12" leftOffsetTablet="1" leftOffsetDesktop="1" leftOffsetWide="1">
                    <div className={cn('content')}>
                        <Header className={cn('header')} as="h2">{title}</Header>
                        <Paragraph className={cn('text')} hasMargin={false}>{convert(text, convertConfig)}</Paragraph>
                        {!!imageUrl && buttonElem}
                    </div>
               </GridColumn>
               <GridColumn all="5" mobile="12">
                    <div className={cn('media')} style={getMediaStyle(imageUrl)}>
                        {!imageUrl && buttonElem}
                    </div>
               </GridColumn>
           </Grid>
        </div>
    );
};

ButtonBanner.propTypes = {
    dataAttrs: PropTypes.objectOf(PropTypes.string.isRequired),
    className: PropTypes.string,
    classes: PropTypes.shape({
        root: PropTypes.string,
        button: PropTypes.string,
    }),
    rootRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.elementType }), PropTypes.any ]),
    ]),
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    buttonText: PropTypes.string.isRequired,
    buttonUrl: PropTypes.string,
    buttonTarget:  PropTypes.oneOf(Object.values(ButtonTarget)),
    buttonColor:  PropTypes.oneOf(Object.values(ButtonColor)),
    onButtonClick: PropTypes.func,
};

export default ButtonBanner;
