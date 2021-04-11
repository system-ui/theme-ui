import React from 'react'
import Preset from '../components/preset'

export default function PresetTemplate({ pageContext: { preset } }) {
  return <Preset preset={preset} />
}
