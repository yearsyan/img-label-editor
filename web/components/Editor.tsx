/** @jsx jsx */
import React, { useEffect, useState } from 'react'
import { apiBase, DataSetItem, fetchResource, rewriteTextResource } from '../api'
import { Image, Button, Space, Tag, Input, message } from 'antd'
import { jsx, css } from '@emotion/react'

interface EditorProps {
  data: DataSetItem
}

const root = css`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`

const centerContainer = css`
  width: 100%;
  display: flex;
  align-item: center;
`

const space = css`
  width: 90%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
`
const smallButton = css`
  margin-top: 8px;
  margin-right: 5px;
`

const withMargin = css`
  margin-top: 10px;
`

export default function Editor(props: EditorProps) {
  const urlBase = `${apiBase()}/fetch?path=`
  const [tags, setTags] = useState<string[]>([])
  const [preTags, setPreTags] = useState<string[]>([])
  const [inputText, setInputText] = useState('')
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    fetchResource(props.data.tagsUrl, true).then((text) => {
      setTags(text.split(', '))
    })
    const preTagsStr = localStorage.getItem('pre_tags')
    if (preTagsStr) {
      setPreTags(JSON.parse(preTagsStr))
    }
  }, [props.data])

  function onCloseClick(index: number) {
    const newTags = [...tags]
    newTags.splice(index, 1)
    setTags(newTags)
  }

  function addTag() {
    if (inputText === '') {
      return
    }
    if (tags.includes(inputText)) {
      return
    }
    setTags([...tags, inputText])
    setInputText('')
  }

  function addPreTag() {
    if (inputText === '') {
      return
    }
    if (preTags.includes(inputText)) {
      return
    }
    setPreTags([...preTags, inputText])
    setInputText('')
  }

  function addPreTagAndTag() {
    if (inputText === '') {
      return
    }
    if (!preTags.includes(inputText)) {
      setPreTags([...preTags, inputText])
    }
    if (!tags.includes(inputText)) {
      setTags([...tags, inputText])
    }
    setInputText('')
  }

  function onPreTagClick(tagName: string) {
    if (tagName === '') {
      return
    }
    if (!tags.includes(tagName)) {
      setTags([...tags, tagName])
    }
  }

  async function onClickSet() {
    const text = tags.join(', ')
    localStorage.setItem('pre_tags', JSON.stringify(preTags))
    await rewriteTextResource(props.data.tagsUrl, text)
    messageApi.success('成功')
  }

  return (
    <div css={[root]}>
      {contextHolder}
      <div css={[centerContainer]}>
        <Image src={urlBase + encodeURIComponent(props.data.imageUrl)} />
      </div>
      <span css={[withMargin]}>tags:</span>
      <div css={[centerContainer]}>
        <Space css={[space]}>
          {tags.map((tagName, index) => (
            <Tag key={tagName + index} closable={true} onClose={() => onCloseClick(index)}>
              {tagName}
            </Tag>
          ))}
        </Space>
      </div>
      <span css={[withMargin]}>预置tags:</span>
      <div css={[centerContainer]}>
        <Space css={[space]}>
          {preTags.length > 0 ? (
            preTags.map((tagName, index) => (
              <Tag css={css`cursor: pointer`} key={tagName + index} closable={true} onClick={() => onPreTagClick(tagName)} onClose={() => onCloseClick(index)}>
                {tagName}
              </Tag>
            ))
          ) : (
            <span>无预置tag</span>
          )}
        </Space>
      </div>
      <Input.TextArea value={inputText} onChange={e => setInputText(e.target.value)} css={[withMargin]} rows={2} />
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <Button css={[smallButton]} size="small" onClick={addTag}>
          添加tag
        </Button>
        <Button css={[smallButton]} size="small" onClick={addPreTag}>
          添加到预置tag
        </Button>
        <Button css={[smallButton]} size="small" onClick={addPreTagAndTag}>
          添加到tag与预置tag
        </Button>
      </div>
      <div css={[centerContainer, css`justify-content: center`, withMargin]}>
        <Button shape='round' type='primary' onClick={onClickSet}>保存</Button>
      </div>
    </div>
  )
}
