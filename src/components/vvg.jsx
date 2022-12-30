validtion = () => {
  const {
    name,
    email,
    image,
    description,
  } = this.state;

  const vName = name.length > 0;
  const vEmail = email.length > 0;
  const vImage = image.length > 0;
  const vDescription = description > 0;

  this.setState({
    btnValid: !(
      vName && vImage && vDescription && vEmail
    ),
  });
};