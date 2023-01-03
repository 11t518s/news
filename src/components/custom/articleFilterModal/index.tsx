import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import BasicModal from "../../modal/basicModal";
import BasicButton from "../../button/basicButton";
import { articleFilterActions, Countries } from "../../../stores/articleFilter";
import { articleActions } from "../../../stores/article";
import { convertDateForFilterHeader } from "../../../utils/time";
import headerImages from "../../../assets/images/router/header";
import theme from "../../../theme";

const HEADLINE_PLACEHOLDER = "검색하실 헤드라인을 입력해주세요.";
const PUBDATE_PLACEHOLDER = "날짜를 선택해주세요.";
const COUNTRIES = [
  { displayName: "대한민국", value: "South Korea" },
  { displayName: "중국", value: "China" },
  { displayName: "일본", value: "Japan" },
  { displayName: "미국", value: "United States" },
  { displayName: "북한", value: "North Korea" },
  { displayName: "러시아", value: "Russia" },
  { displayName: "프랑스", value: "France" },
  { displayName: "영국", value: "England" },
];

interface Props {
  isModal: boolean;
  setIsModal: Dispatch<SetStateAction<boolean>>;
  headline: string;
  pubDate: Date | null;
  countries: Countries[];
}

const ArticleFilterModal = ({
  isModal,
  setIsModal,
  headline: defaultHeadline,
  pubDate: defaultPubDate,
  countries: defaultCountries,
}: Props) => {
  const dispatch = useDispatch();

  const [pubDate, setStartDate] = useState(defaultPubDate);
  const [headline, setHeadline] = useState(defaultHeadline);
  const [countries, setCountries] = useState<Countries[]>(defaultCountries);

  const handleHeadlineChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHeadline(e.target.value);
  };

  const isActive = (receivedCountry: Countries) =>
    countries.some((country) => country.value === receivedCountry.value);

  const handleCountryClick = (receivedCountry: Countries) => {
    if (isActive(receivedCountry)) {
      setCountries((prev) =>
        prev.filter((country) => country.value !== receivedCountry.value)
      );
    } else {
      setCountries((prev) => [...prev, receivedCountry]);
    }
  };

  const handleAdjustFilterClick = async () => {
    const articleFilter = {
      headline,
      countries,
      pubDate,
    };
    dispatch(articleFilterActions.updateArticleFilter(articleFilter));
    await dispatch(articleActions.resetData());
    await dispatch(articleActions.requestData({ ...articleFilter, page: 0 }));

    setIsModal(false);
  };

  const pubDateText = pubDate
    ? convertDateForFilterHeader(pubDate)
    : PUBDATE_PLACEHOLDER;

  return (
    <BasicModal isModal={isModal} setIsModal={setIsModal}>
      <HeadlineLabel>
        헤드라인
        <HeadlineInput
          placeholder={HEADLINE_PLACEHOLDER}
          value={headline}
          onChange={handleHeadlineChange}
          id={"headline"}
        />
      </HeadlineLabel>

      <SectionContainer>
        <p>날짜</p>
        <DatePicker
          selected={pubDate}
          onChange={(date: Date) => setStartDate(date)}
          customInput={
            <DateInputContainer isDate={!!pubDate}>
              <span>{pubDateText}</span>

              <headerImages.calendarComponent
                color={!!pubDate ? theme.color.black : theme.color.gray}
              />
            </DateInputContainer>
          }
        />
      </SectionContainer>

      <SectionContainer>
        <p>국가</p>
        {COUNTRIES.map((country) => (
          <CountryButton
            isActive={isActive(country)}
            key={country.value}
            onClick={() => handleCountryClick(country)}
          >
            {country.displayName}
          </CountryButton>
        ))}
      </SectionContainer>
      <BasicButton label={"필터 적용하기"} onClick={handleAdjustFilterClick} />
    </BasicModal>
  );
};

export default ArticleFilterModal;

const HeadlineLabel = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: 600;
  line-height: 24px;
`;

const HeadlineInput = styled.input`
  padding: 10px 20px;
  width: 295px;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.gray};
  margin-top: 8px;
  margin-bottom: 40px;
  line-height: 24px;
  &::placeholder {
    color: ${({ theme }) => theme.color.gray};
  }
`;

const DateInputContainer = styled.div<{ isDate: boolean }>`
  padding: 10px 20px;
  width: 295px;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.gray};
  cursor: pointer;
  line-height: 24px;

  color: ${({ theme, isDate }) =>
    isDate ? theme.color.black : theme.color.gray};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SectionContainer = styled.div`
  p {
    font-weight: 600;
    line-height: 24px;
    margin-bottom: 8px;
  }
  width: 295px;
  margin-bottom: 40px;
`;
const CountryButton = styled.button<{ isActive: boolean }>`
  color: ${({ theme, isActive }) =>
    isActive ? theme.color.white : theme.color.darkGray};

  background-color: ${({ theme, isActive }) =>
    isActive ? theme.color.subSkyBlue : theme.color.white};

  border: 1px solid ${({ theme }) => theme.color.darkWhite};
  font-size: 14px;
  line-height: 24px;
  padding: 6px 12px 4px 12px;
  margin-right: 3px;
  border-radius: 30px;
  cursor: pointer;
`;
