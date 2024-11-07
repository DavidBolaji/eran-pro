import { Menu } from "antd";
import styled from '@emotion/styled'

export const MenuStyled = styled(Menu)`
  && {
    background-color: #fff;

    .ant-menu-title-content {
      color: #23342A;
      margin-left: 14px !important;
      font-weight: 700;
      
    }
    .ant-menu-item-icon {
      color: #000;
    }
    .ant-menu-item.ant-menu-item-selected {
      background-color: #DDEEE5;
      border-radius: 0px;
      border-left: 4px solid #066932;
    }

    .ant-menu-item.ant-menu-item-selected > * {
      color: #066932 !important;
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;

    }
    .ant-menu-item.ant-menu-item-selected > .ant-menu-item-icon {
      color: #066932;
    }
    .ant-menu-item.ant-menu-item-active {
      background-color: #DDEEE5 !important;
      border-radius: 0px;
    }
    .ant-menu-item.ant-menu-item-active > * {
      color: #066932 !important;
    }
    > * {
      padding-left: 46px !important;
      margin: 0px;
      height: 48px;
      width: 100%;
    }
  }
`