import fromJSON from '../from_json.ts'
import toAPKG from '../to_apkg.ts'
import deckData from './__data__/zh_CN.ts'

Deno.test('write deck to APKG', async () => {
  const deck = fromJSON(JSON.stringify(deckData), { sortField: 'emoji' })
  deck.addTemplate(
    'reading',
    '<h1>{{emoji}}</h1>',
    '{{FrontSide}}\n{{text}}{{sound}}',
  )
  deck.addTemplate(
    'speaking',
    '<h1>{{Text}}</h1>',
    '{{FrontSide}}\n{{emoji}}{{sound}}',
  )

  const media = []
  const path = './adapters/__tests__/__data__/audio'
  for await (
    const file of Deno.readDir(path)
  ) {
    const bytes = await Deno.readFile(path + '/' + file.name)
    const blob = new Blob([bytes], { type: 'audio/mpeg' })
    media.push({ name: file.name, data: blob })
  }

  await Deno.writeFile(
    './test.apkg',
    await toAPKG(deck, { sortField: 'emoji', media }),
  )
})
