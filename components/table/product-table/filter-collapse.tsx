"use client";
import { Collapse } from "antd";
import styled from "@emotion/styled";
import { ICollapseData } from "@/utils/data";

const StyledCollapse = styled.div`
  background-color: #Fff !important;
  padding: 0px;
  border-radius: 10px;
  border: 1px solid #DDEEE5 !important;
  overflow: hidden;

  * > .ant-collapse-header {
    background-color: #F5F6F8 !important;
    padding: 16px !important;
    border-start-start-radius: 16px !important;
    .ant-collapse-header-text {
      color: #23342A;
      font-weight: 900;
      font-size: 14px;
      line-height: 22px;
      font-family: "Satoshi-Regular";
    }
  }

  * > .ant-collapse-content-box > p {
    font-size: 16px;
    font-weight: 500;
    /* transform: translateX(-15px); */
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

const FilterCollapse: React.FC<{ data: ICollapseData[] }> = ({ data }) => {
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

export { FilterCollapse };
