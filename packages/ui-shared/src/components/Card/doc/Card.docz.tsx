import * as React from 'react';
import img from './img.png';
import imgShort from './img_short.png';
import { Header } from '@megafon/ui-core';
import WiFi from 'icons/Basic/32/Wi-fi_32.svg';

const title = 'Cмартфоны Huawei с дополнительной скидкой до 3000 ₽ и подарок — до 1000 ₽ на связь';
const text = 'Сдайте старое оборудование в трейд‑ин и получите дополнительную скидку до 3000 ₽ на смартфоны Huawei и до 1000 ₽ на связь в подарок.';

const button = {
    title: 'Подробнее',
    href: '#',
};

const buttonWithLongTitle = {
    title: 'Очень длинный заголовок',
    href: '#',
};

const fakeLink = {
    title: 'Подключить',
};

const link = {
    ...fakeLink,
    href: '#',
};

const svg = <WiFi style={{ display: 'block', fill: '#00B956' }} />;

const DemoWrapper = ({ wrapperTitle, children }) => (
    <div style={{ maxWidth: '33%', display: 'flex', alignItems: 'center', flexDirection: 'column', margin: '10px'}}>
        <Header as="h2" hAlign="center">{wrapperTitle}</Header>
        <div style={{ marginTop: '15px'}}>
            {children}
        </div>
    </div>
);

export { title, text, button, link, fakeLink, img, imgShort, svg, DemoWrapper, buttonWithLongTitle };
