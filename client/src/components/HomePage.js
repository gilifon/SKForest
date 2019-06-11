import React, { Component } from "react";

export class HomePage extends Component {
  render() {
    return (
      <div className="p-4 mainBG" style={{ direction: "rtl" }}>
        <div className="row">
          <div className="col-md-2" />
          <div className="col-md-8 text-right">
            <p className="mb-4">
              פרוייקט זה, שהוקם ע"י אגודת חובבי הרדיו בישראל על מנת לחלוק כבוד
              לחובבי הרדיו הישראלים שנפטרו, מזמין את הציבור לתרום לזכרם של
              חברינו וליצוק תוכן למפעל הזיכרון.
            </p>
            <p>
              באתר תוכלו למצוא מידע אודות חובבי רדיו שהלכו לעולמם. לכל חובב
              מוקדש דף פרטי ובו מידע שכתבו חבריו ומשפחתו.
              <br />
              כדי לקרוא על חובב מסויים, תוכלו להיעזר באפשרות החיפוש שנמצאת מימין
              למעלה.
            </p>
            <p>
              תוכלו להציע למנהל האתר להוסיף חובב או לבקש ממנו לערוך תוכן באמצעות
              טופס מקוון.
            </p>
          </div>
          <div className="col-md-2" />
        </div>
      </div>
    );
  }
}

export default HomePage;
