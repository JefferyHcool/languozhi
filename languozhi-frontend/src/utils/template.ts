export const generateName = () => {
  const UUID = crypto.randomUUID()

  return '模板' + UUID.replace('-', '').slice(0, 8)
}

export const generatePaperName = () => {
  const UUID = crypto.randomUUID()

  return '试卷' + UUID.replace('-', '').slice(0, 8)
}
