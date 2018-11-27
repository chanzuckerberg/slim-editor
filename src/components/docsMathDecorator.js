// @flow
import React from "react";

type DocsMathDecoratorEntityData = {|
  asciimath?: ?string,
  latex?: ?string,
  text?: ?string,
  xml?: ?string
|};

export default class DocsMathDecorator extends React.Component {
  render() {
    const { contentState, entityKey } = this.props;
    const data: DocsMathDecoratorEntityData = contentState
      .getEntity(entityKey)
      .getData();
    return (
      <math
        data-asciimath={data.asciimath}
        data-latex={data.latex}
        data-text={data.text}
        data-xml={data.xml}
      >
        {data.latex}
      </math>
    );
  }
}
