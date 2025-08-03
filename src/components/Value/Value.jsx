import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import { MdOutlineArrowDropDown } from "react-icons/md";
import data from "../../utils/accordion";
import "./Value.css";
const Value = () => {
  return (
    <section className="v-wrapper">
      <div className="paddings innerWidth flexCenter v-container">
        <div className="v-left">
          <div className="image-container">
            <img src="./value.png" alt="home" />
          </div>
        </div>
        <div className="flexColStart v-right">
          <span className="orangeText v-title">Our Value</span>
          <span className="primaryText">Value We Give to You</span>
          <span className="v-subtitle">
            We always ready to help by providing the best services for you{" "}
            <br />
            We believe a good place to live can make your life better
          </span>

          <Accordion
            allowMultipleExpanded={false}
            allowZeroExpanded={false}
            preExpanded={[0]}
            className="accordion"
          >
            {data.map((item, index) => (
              <AccordionItem className="accordionItem" key={index} uuid={index}>
                <AccordionItemHeading>
                  <AccordionItemButton className="flexCenter accordionButton">
                    <AccordionItemState>
                      {({ expanded }) => (
                        <>
                          <div className="flexCenter icon">{item.icon}</div>
                          <span className="primaryText">{item.heading}</span>
                          <div
                            className={`flexCenter icon ${
                              expanded ? "rotate" : ""
                            }`}
                          >
                            <MdOutlineArrowDropDown size={20} />
                          </div>
                        </>
                      )}
                    </AccordionItemState>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <span className="secondaryText">{item.detail}</span>
                </AccordionItemPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Value;
