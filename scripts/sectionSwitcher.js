(function() {
  // Section Switcher
  class SectionSwitcher {
    parent = undefined;
    sectionClass = "section";
    sectionOutClass = "section-out";
    sectionInClass = "section-in";
    sectionAnchorsSelector = "[data-section]";
    sections = undefined;
    anchors = undefined;
    currentSection = 0;
    defaultPosition = 0;
    delay = 1000;

    constructor(parent = document.body) {
      this.sections = parent.querySelectorAll(`.${this.sectionClass}`);
      this.anchors = parent.querySelectorAll(this.sectionAnchorsSelector);
      this.initControls();
      this.setPosition(this.defaultPosition);
    }

    initControls() {
      this.anchors.forEach(anchor => {
        let pos = parseInt(anchor.getAttribute("data-section"), 10);
        anchor.addEventListener("click", this.switchTo.bind(this, pos));
      });
    }

    switchToNext() {
      const nextPos = this.currentSection + 1;
      nextPos < this.sections.length && this.switchTo(nextPos);
    }

    switchToPrev() {
      const prevPos = this.currentSection--;
      prevPos > 0 && this.switchTo(prevPos);
    }

    switchTo(idx) {
      const prevIdx = this.currentSection;
      this.sections[prevIdx].classList.remove("active");

      this.sections[prevIdx].classList.add(this.sectionOutClass);
      this.sections[idx].classList.add(this.sectionInClass);
      this.currentSection = idx;
      this.setPosition(idx);

      setTimeout(() => {
        this.sections[prevIdx].classList.remove(this.sectionOutClass);
        this.sections[idx].classList.remove(this.sectionInClass);
      }, this.delay);
    }

    setPosition(idx) {
      this.sections[idx].classList.add("active");
    }

    pushNewSection(id) {
      const section = document.createElement("DIV");
      section.classList.add(this.sectionClass);
      id && (section.id = id);
      this.sections.push(section);
      return section;
    }
  }

  window.SectionSwitcher = SectionSwitcher;
})();
