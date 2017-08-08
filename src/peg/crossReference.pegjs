References
  = ref:Reference refs:(_* ';' _* r:Reference { return r; })* _* ';'?
  {
    return [ ref, ...refs ];
  }

Reference
  = '@' ref:[^@;]+
  {
    return ref.join('');
  }

_ 'whitespace'
  = '\u0020' / '\u0009'
