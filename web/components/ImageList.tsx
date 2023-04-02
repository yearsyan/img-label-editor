/** @jsx jsx */
import React from 'react'
import { Card, List, Image, Button } from 'antd'
import { apiBase, DataSetItem } from '../api'
import { jsx, css } from '@emotion/react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

const container = css`
  width: 100%;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

interface ListProps {
  items: DataSetItem[]
  onClickItem: (index: number) => void
}
export default function ImageList(props: ListProps) {
  const urlBase = `${apiBase()}/fetch?path=`
  const columnNum = useSelector((state: RootState) => state.setting.listColumnNum)

  return (
    <List
      css={css`
        width: calc(100% - 30px);
        margin: 0 15px;
      `}
      grid={{ gutter: 16, column: columnNum }}
      dataSource={props.items}
      renderItem={(item, index) => (
        <List.Item
          css={css`
            margin: 8px;
          `}
        >
          <Card bodyStyle={{ padding: '8px 0 5px 0' }}>
            <div css={[container]}>
              <Image width="100%" src={urlBase + encodeURIComponent(item.imageUrl)} />
            </div>
            <div
              css={[
                container,
                css`
                  padding-top: 0 10px;
                `
              ]}
            >
              <Button type="primary" shape="round" onClick={() => props.onClickItem(index)}>
                编辑
              </Button>
            </div>
          </Card>
        </List.Item>
      )}
    />
  )
}
