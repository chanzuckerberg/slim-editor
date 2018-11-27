import React from "react";

type DocsImageDecoratorEntityData = {|
  align?: string,
  url: string,
  height: string,
  width: string
|};

export default class DocsImageDecorator extends React.Component {
  render() {
    const { contentState, entityKey } = this.props;
    const entityData: DocsImageDecoratorEntityData = contentState
      .getEntity(entityKey)
      .getData();
    const { align, height, url, width } = entityData;
    return <img data-align={align} src={url} height={height} width={width} />;
  }
}
