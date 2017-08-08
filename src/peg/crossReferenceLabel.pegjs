All
  = match:Match .*
  {
    return match;
  }

Match
  = space:_* data:CrossRefLabel
  {
    return Object.assign(data, {
      location: location(),
    });
  }

CrossRefLabel
  = '{#' label:Label options:Options? '}'
  {
    return {
      label: label,
      options: options
    };
  }

Label
  = label:(!'}' c:Letter { return c; })+
  {
    return label.join('');
  }

Options
  = _+ options:(!'}' c:Char { return c; })+
  {
    return options.join('');
  }

Letter
  = !_ c:Char { return c; }

Char
  =  c:('\\' [^\n] / !'\\' [^\n])
  {
    return c.join('');
  }

_ 'whitespace'
  = '\u0020' / '\u0009'
