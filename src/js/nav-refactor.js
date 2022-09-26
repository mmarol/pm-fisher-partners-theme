// nav.js

function NavHighlighting () {

  let $section
  let bbox

  function setSection (_$section) {
    $section = _$section
  }

  function updateBBox () {
    bbox = $section.get(0).getBoundingClientRect();
  }

  function onScroll ({ scrollTop }) {
    if (!$section) return
    if (
      scrollTop >= bbox.top &&
      scrollTop <= bbox.bottom
    ) {
      lightenMenu();
    } else {
      darkenMenu();
    }
  }

  return {
    setSection,
    updateBBox,
    onScroll,
  }  
}

// index.js

import NavHighlighting from './nav.js'

const navHighlighting = NavHighlighting()
// navHighlighting.onInvert(lightenMenu)
// navHighlighting.onUninvert(darkenMenu)


$(document).on('ready', {
  navHighlighting.setSection($('div'))
})

$(window).on('resize', () => {
  navHighlighting.updateBBox()
})

$(window).on('scroll', () => {
  navHighlighting.onScroll({ scrollTop: $(window).scrollTop })
})