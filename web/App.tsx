/** @jsx jsx */
import React, { useEffect, useState } from 'react'
import { DataSetItem, getAllDataset } from './api'
import { jsx, css } from '@emotion/react'
import { Input, Button, Drawer } from 'antd'
import ImageList from './components/ImageList'
import Editor from './components/Editor'

const container = css`
  width: 100%;
  max-height: 100vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export default function App() {
  const [baseDataArray, setBaseDataArray] = useState<DataSetItem[]>([])
  const [sourcePath, setSourcePath] = useState('')
  const [editingIndex, setEditingIndex] = useState(-1)

  function load() {
    sourcePath &&
      getAllDataset(sourcePath).then((res) => {
        setBaseDataArray(res)
      })
  }

  function onClickItem(index: number) {
    setEditingIndex(index)
  }

  return (
    <div css={[container]}>
      <div
        css={css`
          margin-top: 10px;
          width: 100%;
          display: flex;
          justify-content: center;
        `}
      >
        <Input
          css={css`
            width: 80%;
            margin-right: 10px;
          `}
          placeholder="输入图片与标签所在目录"
          onChange={(e) => {
            setSourcePath(e.target.value)
          }}
        />
        <Button shape="round" onClick={load}>
          加载
        </Button>
      </div>
      <ImageList onClickItem={onClickItem} items={baseDataArray} />
      <Drawer width={'40%'} placement="right" open={editingIndex >= 0} onClose={() => setEditingIndex(-1)}>
        {baseDataArray[editingIndex] && <Editor data={baseDataArray[editingIndex]} />}
      </Drawer>
    </div>
  )
}
