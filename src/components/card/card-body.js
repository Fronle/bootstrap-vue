import { defineComponent, h, mergeProps } from '../../vue'
import { NAME_CARD_BODY } from '../../constants/components'
import { copyProps, pluckProps, prefixPropName } from '../../utils/props'
import cardMixin from '../../mixins/card'
import { BCardTitle, props as titleProps } from './card-title'
import { BCardSubTitle, props as subTitleProps } from './card-sub-title'

// --- Props ---

export const props = {
  // Import common card props and prefix them with `body-`
  ...copyProps(cardMixin.props, prefixPropName.bind(null, 'body')),
  bodyClass: {
    type: [String, Object, Array]
    // default: null
  },
  ...titleProps,
  ...subTitleProps,
  overlay: {
    type: Boolean,
    default: false
  }
}

// --- Main component ---
// @vue/component
export const BCardBody = /*#__PURE__*/ defineComponent({
  name: NAME_CARD_BODY,
  functional: true,
  props,
  render(_, { props, data, children }) {
    let cardTitle = h()
    let cardSubTitle = h()
    const cardContent = children || [h()]

    if (props.title) {
      cardTitle = h(BCardTitle, { props: pluckProps(titleProps, props) })
    }

    if (props.subTitle) {
      cardSubTitle = h(BCardSubTitle, {
        props: pluckProps(subTitleProps, props),
        class: ['mb-2']
      })
    }

    return h(
      props.bodyTag,
      mergeProps(data, {
        staticClass: 'card-body',
        class: [
          {
            'card-img-overlay': props.overlay,
            [`bg-${props.bodyBgVariant}`]: props.bodyBgVariant,
            [`border-${props.bodyBorderVariant}`]: props.bodyBorderVariant,
            [`text-${props.bodyTextVariant}`]: props.bodyTextVariant
          },
          props.bodyClass || {}
        ]
      }),
      [cardTitle, cardSubTitle, ...cardContent]
    )
  }
})
