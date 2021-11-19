import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatus.js";


describe("ProfileStatus component", () => {
  it('status from props should been in the state', () => {
  const component = create(<ProfileStatusWithHooks status='hello my friend'/>)
  const tree = component.toJSON()
  const instance = component.getInstance()
  expect(tree).toMatchSnapshot()
  })
})