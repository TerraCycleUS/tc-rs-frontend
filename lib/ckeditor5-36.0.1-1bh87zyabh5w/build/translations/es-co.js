;(function (o) {
  const e = (o['es-co'] = o['es-co'] || {})
  e.dictionary = Object.assign(e.dictionary || {}, {
    '%0 of %1': '%0 de %1',
    'Block quote': 'Cita de bloque',
    Bold: 'Negrita',
    Cancel: 'Cancelar',
    Italic: 'Cursiva',
    Save: 'Guardar',
    'Show more items': 'Mostrar más elementos',
    'Upload in progress': 'Carga en progreso',
  })
  e.getPluralForm = function (o) {
    return o == 1 ? 0 : o != 0 && o % 1e6 == 0 ? 1 : 2
  }
})(window.CKEDITOR_TRANSLATIONS || (window.CKEDITOR_TRANSLATIONS = {}))
