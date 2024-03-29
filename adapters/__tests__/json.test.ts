import { assertSnapshot } from 'jsr:@std/testing@0.216/snapshot'
import fromJSON from '../from_json.ts'
import toJSON from '../to_json.ts'
import deckData from './__data__/zh_CN.ts'

Deno.test('init Deck to/from JSON', async (t) => {
  const deck = fromJSON(JSON.stringify(deckData), { sortField: 'emoji' })
  await assertSnapshot(t, toJSON(deck))
})
