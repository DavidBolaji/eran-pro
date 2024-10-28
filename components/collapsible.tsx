"use client";
import { Collapse } from "antd";
import styled from "@emotion/styled";
import { ICollapseData } from "@/utils/data";

const StyledCollapse = styled.div`
  background-color: #fff !important;
  padding: 20px;
  border-radius: 10px;

  * > .ant-collapse-header {
    background-color: #fff !important;
    .ant-collapse-header-text {
      color: #23342a;
      font-weight: 900;
      font-size: 16px;
      transform: translateX(-10px);
      line-height: 24px;
      font-family: "Satoshi-Regular";
    }
  }

  * > .ant-collapse-content-box > p {
    font-size: 16px;
    font-weight: 500;
    transform: translateX(-15px);
    color: #23342a;
    line-height: 24px;
    font-family: "Satoshi-Regular";
  }

  * > .ant-collapse-content-box {
    background-color: #ffffff !important;
    padding: 0px;
  }

  @media (max-width: 500px) {
    * > .ant-collapse-header-text {
      font-size: medium;
    }
    * > .ant-collapse-content-box > p {
      transform: translateX(-5px);
    }
  }
`;

const CollapseComponent: React.FC<{ data: ICollapseData[] }> = ({ data }) => {
  return (
    <StyledCollapse>
      <Collapse
        defaultActiveKey={["1"]}
        bordered={false}
        expandIconPosition={"end"}
        size="large"
        items={data}
      />
    </StyledCollapse>
  );
};

export { CollapseComponent };
