// @flow
import React from "react";

type LinkDecoratorEntityData = {|
  url: string
|};

export default class DocsLinkDecorator extends React.Component {
  render() {
    const { contentState, entityKey } = this.props;
    const data: LinkDecoratorEntityData = contentState
      .getEntity(entityKey)
      .getData();
    return <a href={data.url}>{this.props.children}</a>;
  }
}
