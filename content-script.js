(() => {
  const overrides = `
    const overridesInterval = setInterval(() => {
      if(!window.stickies) {
        return
      }

      // Remove bounds check on color index
      stickies.models.Card.prototype.colorize = function(colorIndex) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        if (this.findSpecialKeyword()) return;

        if (colorIndex < 0) {
            colorIndex = DEFAULT_COLOR_INDEX;
        }

        this.set({
            colorIndex: colorIndex
        });
        this.touch();
        if (!options.shouldBroadcast) return;
        this.sheet().trigger("card:colorized", this, colorIndex);
      }

      // Override the template to show our new selectors
      Object.defineProperty(stickies.views.Card.prototype, 'template', {
        get: () => {
            return () => (\`
      <div class='header-bar'>
        <span class='delete-btn'>&times;</span>
        <span class='notice' style='display: none'></span>
      </div>
      <div class='content'>
        <div class='viewable'></div>
        <textarea class='editable'></textarea>
      </div>
      <div class='card__footer'>
        <div class='card__authors card__action'></div>
        <div class='card__colors card__action'>
          <span class='color card__color color-0'></span>
          <span class='color card__color color-1'></span>
          <span class='color card__color color-2'></span>
          <span class='color card__color color-3'></span>
          <span class='color card__color color-4'></span>
          <span class='color card__color color-5'></span>
          <span class='color card__color color-6'></span>
          <span class='color card__color color-7'></span>
          <span class='color card__color color-8'></span>
          <span class='color card__color color-9'></span>
          <span class='color card__color color-10'></span>
          <span class='color card__color color-11'></span>
        </div>
        <div class='card__plus-one--button card__plus-one card__action'>
          <div class='card__plus-one-count' title="Change the +1 count for this card">+1</div>
        </div>
        <div class='card__plus-one--static-text card__plus-one tooltip-parent'>
          <div class='card__plus-one-count'></div>
          <div class='tooltip tooltip--right'>
            <div class='tooltip__avatars'></div>
          </div>
        </div>
      </div>
    \`);
        }
    })

      // Rerender all the cards with the new template
      const sheetView = router.roomView.board.sheetView
      sheetView._childViews.forEach((groupView) => {
          groupView.cardViews.forEach((cardView) => {
              cardView.render()
          })
      })

      clearInterval(overridesInterval)
    }, 100)
  `;

  const script = document.createElement("script");
  script.textContent = overrides;
  document.body.appendChild(script);
})();