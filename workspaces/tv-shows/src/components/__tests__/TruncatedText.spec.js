import { shallowMount } from "@vue/test-utils";

import TruncatedText from "../TruncatedText";

describe("TruncatedText.vue", () => {
  it("does truncate the text if there's a max length", () => {
    const text = "Ceci est mon texte.";
    const maxLength = 15;
    const truncated = "Ceci est mon...";
    const wrapper = shallowMount(TruncatedText, {
      propsData: { text, maxLength }
    });
    expect(wrapper.text()).toEqual(truncated);
  });
  it("does not truncate the text if there's no max length", () => {
    const text = "Ceci est mon texte.";
    const wrapper = shallowMount(TruncatedText, {
      propsData: { text }
    });
    expect(wrapper.text()).toEqual(text);
  });
  it("does not truncate the text if the given max length equals -1", () => {
    const text = "Ceci est mon texte.";
    const maxLength = -1;
    const wrapper = shallowMount(TruncatedText, {
      propsData: { text, maxLength }
    });
    expect(wrapper.text()).toEqual(text);
  });
  it("does not truncate the text if the max length is superior to the length of the given text", () => {
    const text = "Ceci est mon texte.";
    const maxLength = 100;
    const wrapper = shallowMount(TruncatedText, {
      propsData: { text, maxLength }
    });
    expect(wrapper.text()).toEqual(text);
  });
  it("toggles the truncated text if we click on it", () => {
    const text = "Ceci est mon texte.";
    const maxLength = 15;
    const truncated = "Ceci est mon...";
    const wrapper = shallowMount(TruncatedText, {
      propsData: { text, maxLength }
    });
    expect(wrapper.text()).toEqual(truncated);
    wrapper.find("span > span").trigger("click");
    expect(wrapper.text()).toEqual(text);
    wrapper.find("span > span").trigger("click");
    expect(wrapper.text()).toEqual(truncated);
  });
});
