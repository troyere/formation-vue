import { shallowMount } from "@vue/test-utils";

import Truncated from "../Truncated";

describe("Truncated.vue", () => {
  it("does truncate the text if there's a max length", done => {
    const maxLength = 15;
    const wrapper = shallowMount(Truncated, {
      slots: { default: ["Ceci est mon texte."] },
      propsData: { maxLength }
    });
    // Attention, le nextTick n'est utilisé ici que parce qu'il y a un slot
    wrapper.vm.$nextTick(() => {
      expect(wrapper.text()).toEqual("Ceci est mon...");
      done();
    });
  });
  it("does not truncate the text if there's no max length", done => {
    const text = "Ceci est mon texte.";
    const wrapper = shallowMount(Truncated, {
      slots: { default: [text] }
    });
    wrapper.vm.$nextTick(() => {
      expect(wrapper.text()).toEqual(text);
      done();
    });
  });
  it("does not truncate the text if the given max length equals -1", done => {
    const text = "Ceci est mon texte.";
    const maxLength = -1;
    const wrapper = shallowMount(Truncated, {
      slots: { default: [text] },
      propsData: { maxLength }
    });
    wrapper.vm.$nextTick(() => {
      expect(wrapper.text()).toEqual(text);
      done();
    });
  });
  it("does not truncate the text if the max length is superior to the length of the given text", done => {
    const text = "Ceci est mon texte.";
    const maxLength = 100;
    const wrapper = shallowMount(Truncated, {
      slots: { default: [text] },
      propsData: { maxLength }
    });
    wrapper.vm.$nextTick(() => {
      expect(wrapper.text()).toEqual(text);
      done();
    });
  });
  it("toggles the truncated text if we click on it", done => {
    const text = "Ceci est mon texte.";
    const maxLength = 15;
    const truncated = "Ceci est mon...";
    const wrapper = shallowMount(Truncated, {
      slots: { default: [text] },
      propsData: { maxLength }
    });
    wrapper.vm.$nextTick(() => {
      expect(wrapper.text()).toEqual(truncated);
      wrapper.find("span").trigger("click");
      expect(wrapper.text()).toEqual(text);
      wrapper.find("span").trigger("click");
      expect(wrapper.text()).toEqual(truncated);
      done();
    });
  });
});
