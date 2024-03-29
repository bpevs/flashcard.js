import { assertEquals } from 'jsr:@std/assert@0.216'
import { assertSnapshot } from 'jsr:@std/testing@0.216/snapshot'
import fromOBJ from '../from_obj.ts'
import fromTSV from '../from_tsv.ts'
import toTSV from '../to_tsv.ts'
import deckData from './__data__/zh_CN.ts'

/**
 * @todo Update TSV to support Anki-style TSV with headers
 * @reference https://docs.ankiweb.net/importing/text-files.html#file-headers
 */
Deno.test('init Deck to/from TSV', async (t) => {
  const deck = fromOBJ(deckData, { sortField: 'emoji' })
  const tsvResult = toTSV(deck)
  await assertSnapshot(t, tsvResult)
  const tsvDeck = fromTSV(tsvResult, {
    sortField: 'emoji',
    meta: {
      id: deck.id,
      name: deck.name,
      desc: deck.desc,
      meta: deck.meta,
    },
  })

  assertEquals(deck.notes, tsvDeck.notes)
})
