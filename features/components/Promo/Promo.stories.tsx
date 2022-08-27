import React from "react";
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PLATFORM_IMAGE } from "../../../sample-data";
import { Promo, PromoProps } from "./Promo";

export default {
  title: 'Sections/Promo',
  component: Promo,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Promo>;

const Template: ComponentStory<typeof Promo> = (args) => (
  <Promo {...args} />
);

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const SinglePromo: ComponentStory<React.FC<PromoProps>> = Template.bind({});
SinglePromo.args = {
  title: "test",
  body: 'success',
  image: PLATFORM_IMAGE,
};
