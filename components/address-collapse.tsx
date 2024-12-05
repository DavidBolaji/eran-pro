"use client";
import { Collapse } from "antd";
import styled from "@emotion/styled";
// import { ICollapseData } from "@/utils/data";

const StyledCollapse = styled.div`
  background-color: #fff !important;
  padding: 0px;
  width: 100% !important;
  .ant-collapse {
    background-color: #fff;
  }

  .ant-collapse-item {
    margin-bottom: 24px;
    border: none !important  
  }

  .ant-collapse-item.ant-collapse-item-active {
    .ant-collapse-header {
      background-color: #f5f6f8 !important;
    }
  }

  .ant-collapse-header {
   
    background-color: #f5f6f8 !important;
    border-radius: 16px !important;
    .ant-collapse-header-text {
      color: #23342a;
      font-weight: 900;
      font-size: 14px;
      line-height: 22px;
      font-family: "Satoshi-Variable";
    }
  }

  .ant-collapse-content-box > p {
    font-size: 16px;
    font-weight: 500;
    color: #23342a;
    line-height: 24px;
    font-family: "Satoshi-Variable";
  }

  .ant-collapse-content-box {
    background-color: #ffffff !important;
    padding: 0px !important;
  }

  @media (max-width: 500px) {
    * > .ant-collapse-header-text {
      font-size: medium;
    }
    * > .ant-collapse-content-box > p {
      /* transform: translateX(-5px); */
    }
  }
`;

interface AddressCollapseProps {
    data: {
      key: string;
      label: React.ReactNode;
      children: React.ReactNode;
    }[];
    onChange?: (key: string[]) => void;
  }

  const AddressCollapse: React.FC<AddressCollapseProps> = ({ data, onChange}) => (
    <StyledCollapse>
      <Collapse
        accordion
        defaultActiveKey={["Select delivery address"]}
        bordered={false}
        expandIconPosition={"end"}
        size="large"
        onChange={onChange}
      >
        {data.map(({ key, label, children }) => (
          <Collapse.Panel header={label} key={key}>
            {children}
          </Collapse.Panel>
        ))}
      </Collapse>
    </StyledCollapse>
  );

export { AddressCollapse };
