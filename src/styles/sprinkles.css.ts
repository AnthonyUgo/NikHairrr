// src/styles/sprinkles.css.ts
import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles';
import { vars } from './theme.css';

const responsive = defineProperties({
  conditions: { mobile: {}, tablet: { '@media': 'screen and (min-width: 768px)' } },
  defaultCondition: 'mobile',
  properties: {
    display: ['none','block','flex','grid'],
    padding: { none:'0', xs:vars.space.xs, sm:vars.space.sm, md:vars.space.md, lg:vars.space.lg },
    gap: { xs:vars.space.xs, sm:vars.space.sm, md:vars.space.md, lg:vars.space.lg },
    justifyContent: ['flex-start','center','space-between','flex-end'],
    alignItems: ['flex-start','center','flex-end'],
    borderRadius: [vars.radius.md, vars.radius.xl]
  }
});
export const sprinkles = createSprinkles(responsive);
export type Sprinkles = Parameters<typeof sprinkles>[0];
