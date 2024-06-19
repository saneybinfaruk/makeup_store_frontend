import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Checkbox,
  Flex,
  HStack,
} from "@chakra-ui/react";
import React from "react"; 

interface Props {
  title: string;
  data: { label: string; value: string }[];
  onChecked: (
    value: string
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  toCheck: string[];
}
const AccordionFilterItem = ({ title, data, onChecked, toCheck }: Props) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left" fontWeight={"600"}>
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>

      <AccordionPanel>
        <Flex flexDir={"column"} gap={2}>
          {data.map((d) => (
            <HStack key={d.value}>
              <Checkbox
                onChange={onChecked(d.value)}
                isChecked={toCheck.includes(d.value)}
              >
                {d.label}
              </Checkbox>
            </HStack>
          ))}
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default AccordionFilterItem;
