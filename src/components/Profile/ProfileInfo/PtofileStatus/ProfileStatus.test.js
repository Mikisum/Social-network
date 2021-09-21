import React from "react";
import ProfileStatus from "./ProfileStatus.jsx";
import renderer from 'react-test-renderer';

describe("ProfileStatus component", () => {
  it('status from props should been in the state', () => {
  const component = renderer.create(<ProfileStatus status='hello my friend'/>)
  const tree = component.toJSON()
  const instance = component.getInstance()
  expect(tree).toMatchSnapshot()
  })
})