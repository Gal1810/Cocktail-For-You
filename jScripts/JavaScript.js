document.addEventListener('DOMContentLoaded', function () { // מאזין לטעינת תוכן הדף
    var radioB = document.querySelectorAll('input[type="radio"][name="alcohol"]'); // משתנה גלובלי ששומר את הבחירות בבחירה בכפתור 'רדיו' תחת השם 'אלכוהול'
    var checkB = document.querySelectorAll('input[type="checkbox"]'); // משתנה גלובלי ששומר את הבחירות בכפתורי 'צ'ק-בוקס'

    function resetOpacity() { // פונקציה שמשנה את שקיפות התמונות, בעצם גורמת שיהיה אפשר לבחור רק בסיס אלכוהולי אחד בשונה מפירות
        var images = document.querySelectorAll('#alcoholPic img'); // משתנה שבוחר את כל התמונות שנמצאות תחת אותו מזהה (alcoholPic)
        images.forEach(function (image) { // לולאה אשר רצה על כל אחת מהאלמנטים בדיב הרלוונטי, ומשנה את השקיפות שלהם
            image.style.opacity = '0.5';
        });
    }
    function buttonOpacity() { // פונקציה שמשנה את שקיפות הכפתור
        var selectedRadio = document.querySelector('input[type="radio"][name="alcohol"]:checked'); // משתנה שבודק אם נבחר אחד מכפתורי הרדיו תחת המשפחה alcohol
        var selectedCheckBox = document.querySelector('input[type="checkbox"]:checked'); // כמו המשתנה הקודם, בודק לחיצה ומשפחה
        if (selectedRadio || selectedCheckBox) { // לולאה שבודקת את הלחיצות, אם הן התרחשו אז הכפתור משנה שקיפות
            submitButton.style.opacity = '1';
        } else {
            submitButton.style.opacity = '0.5'; 
        }
    }
    radioB.forEach(function (radio) { // לולאה שרצה על כפתורי הרדיו ובודקת קריאה אליהם
        radio.addEventListener('change', function () { // פונקציה אנונימית אשר הוספנו לה מזהה לחיצה (מאזין) לכפתורי הרדיו, והיא בודקת האם מתרחש בהם שינוי
            resetOpacity(); // מחליף את השקיפות למשקה הנבחר (כי אי אפשר על בסיס 2 משקאות)
            var imageClass = radio.getAttribute('data-image'); // כאשר מתקיימת לחיצה על אלמנט, הלולאה "מקבלת" את המידע (התמונה) והשקיפות משתנה בהתאם
            var imageElement = document.querySelector('.' + imageClass); // המשתנה הזה בעצם מחפש את הקלאס (בגלל זה ה "." ) ומוצא אותו לפי בחירת המשתנה, לדוגמא .vodka בעצם קורא לקלאס וודקה.
            if (imageElement) { // אם נבחר אלמנט עם קלאס והוא נמצא, השקיפות משתנה ל1
                imageElement.style.opacity = '1';
            }
        });
    });

    checkB.forEach(function (checkBox) { // לולאה שרצה על כפתורי הצ'ק-בוקס ובודקת קריאה אליהם
        checkBox.addEventListener('change', function () { // פונקציה אנונימית אשר הוספנו לה מזהה לחיצה (מאזין) לכפתורי הצ'ק-בוקס, והיא בודקת האם מתרחש בהם שינוי
            var imageClass = checkBox.getAttribute('data-image'); // כאשר מתקיימת לחיצה על אלמנט, הלולאה "מקבלת" את המידע (התמונה) והשקיפות משתנה בהתאם
            var imageElement = document.querySelector('.' + imageClass); // המשתנה הזה בעצם מחפש את הקלאס (בגלל זה ה "." ) ומוצא אותו לפי בחירת המשתנה, לדוגמא .lemon בעצם קורא לקלאס לימון.
            if (imageElement) { // אם נמצא אלמנט עם קלאס תואם, הוא משתנה בהתאם להגדרות הלולאה
                if (checkBox.checked) { // אם הצ'ק-בוקס לחוץ, השקיפות משתנה ל1, אם לא השקיפות נשארת\חוזרת ל0.5
                    imageElement.style.opacity = '1';
                } else {
                    imageElement.style.opacity = '0.5';
                }
            }
            buttonOpacity(); // כאשר ביצענו את השלב הזה, הפונקציה מופעלת ומעלה שקיפות בהתאם
        });
    });
});
function send() { //פועלת בעת לחיצה על כפתור 'שלחו הזמנה'
    var selectedAlcohol = document.querySelector('input[type="radio"][name="alcohol"]:checked'); // מוצא את הבחירה של כפתור הרדיו
    var selectedFruits = document.querySelectorAll('input[type="checkbox"]:checked'); // מוצא את הבחירה של כפתורי הצ'ק-בוקס
    var extraNotes = document.getElementById('textarea1').value; // לוקח את הערך שהמשתמש כתב בתוך התיבה 'הערות נוספות'
    var alcoholText;
    if (selectedAlcohol) { // תנאי הבודק האם נבחר אלכוהול, ומהו
        alcoholText = selectedAlcohol.nextSibling.textContent; // משתנה אשר יבדוק וישמור את מה שכתוב לאחר הנקודה של כפתור הרדיו, לדוגמא 'יין אדום'
    } else {
        alcoholText = "לא נבחר בסיס אלכוהול";
    }
    var fruitTexts = []; // מסדר את הפירות במערך

    for (var i = 0; i < selectedFruits.length; i++) { // לולאה שרצה על אורך המערך, במידה ופרי מסומן, היא לוקחת את הערך (שם) שלו ומוסיפה למשתנה
        var checkBox = selectedFruits[i];
        if (checkBox.checked) {
            fruitTexts.push(checkBox.nextSibling.textContent); // השורה הזו "דוחפת" את הערך שמגיע אחרי הצ'ק-בוקס אל המערך לפי הסדר, לדוגמא אם נבחר הצ'ק-בוקס של אשכולית אדומה, הטקסט אשכולית אדומה יופיע בהתאם
        }
    }
    var fruitsText = ""; // משתנה ריק שיוזן אליו ערך מהלולאה בהמשך

    if (fruitTexts.length > 0) { // לולאה שרצה על המערך
        for (var i = 0; i < fruitTexts.length; i++) {
            fruitsText += fruitTexts[i]; // בדיקה האם זהו הפריט האחרון במערך, אם לא נוסף לנו פסיק, אם כן עוברים ל else
            if (i < fruitTexts.length - 1) {
                fruitsText += ',';
            }
        }
    } else {
        fruitsText = "לא נבחרו פירות";
    }
    var message = "הזמנתכם היא על בסיס" + alcoholText + "\n" + // הודעה אשר מכרישה כי ההזמנה נשלחה, ומציגה את ההזמנה, השימוש בפקודה /n היא מכיוון שסוג ההודעה איננו תומך באלמנטים של HTML
        "הפירות שנבחרו הם" + fruitsText + "\n" +
        "הערות נוספות להזמנה: " + extraNotes;
    alert(message); // הפקודה אשר מקפיצה את ההודעה על המסך
}