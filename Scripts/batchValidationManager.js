/* batchValidationManager.js: フォーム送信時の一括入力検証
*/

// 一括検証処理のエントリーポイント。フォームの送信ボタン押下時に呼び出される
function processInputData(event)
{
    console.log("Processing input data...");

    // すべての検証が通るまでフォーム送信を抑止
    event.preventDefault();

    console.log("Retrieving input field values...");

    // 各フィールドの入力値を取得
    const RETRIEVED_NAME = document.getElementById("name-input").value;
    const RETRIEVED_PHONE_NUMBER = document.getElementById("phone-number-input").value;
    const RETRIEVED_BIRTH_DATE_DAY = document.getElementById("birthday-day-input").value;
    const RETRIEVED_BIRTH_DATE_MONTH = document.getElementById("birthday-month-input").value;
    const RETRIEVED_BIRTH_DATE_YEAR = document.getElementById("birthday-year-input").value;
    const RETRIEVED_FAVORITE_PASTIME = document.getElementById("favorite-pastime-input").value;

    console.log("All input field values retrieved, starting validation...");

    // フォーム全体が有効かどうかを判定
    let formValidity = performBatchValidation(RETRIEVED_NAME, RETRIEVED_PHONE_NUMBER, RETRIEVED_BIRTH_DATE_DAY, RETRIEVED_BIRTH_DATE_MONTH, RETRIEVED_BIRTH_DATE_YEAR, RETRIEVED_FAVORITE_PASTIME);

    // 有効な場合のみフォームを送信する
    if (formValidity == true)
    {
        console.log("Submitting form...");
        event.target.closest("form").submit();
    }
    else
    {
        console.log("Form was invalid, not submitting");
    }
}

// 一括検証のメイン処理。processInputData() から呼び出され、フォームが有効かどうかを判定する
// いずれかの入力が無効な場合は false、すべて有効な場合は true を返す
function performBatchValidation(inName, inPhoneNumber, inBirthDateDay, inBirthDateMonth, inBirthDateYear, inFavoritePastime)
{
    /* 各入力欄について:
        - 対応する検証関数を呼び出す
        - 無効な場合はアラートを表示して false を返す。有効な場合は次の検証へ進む
        - すべて成功した場合は true を返す
    */

    console.log("Validating name...");

    if (validateName(inName) === false)
    {
        console.log("Name validation failed, returning false");

        alert("Please ensure that the entered name does not contain any numbers and only English alphabet characters");
        return false;
    }

    console.log("Name validation succeeded");
    console.log("Validating phone number...");

    if (validatePhoneNumber(inPhoneNumber) === false)
    {
        console.log("Phone number validation failed, returning false");

        alert("Please ensure that the phone number entered is valid according to the rules specified on the page")
        return false;
    }

    console.log("Phone number validation succeeded");
    console.log("Validating birthday...");

    /* 生年月日の検証は3つの関連フィールドが相互に影響するため比較的複雑であり、
       主な処理は birthdayValidator.js に集約している。
       
       本関数はエントリーポイントを呼び出すだけ。
       そのため生年月日関連はフィールドごとではなく、1つの if 文でまとめて検証している
    */

    if (validateBirthday(inBirthDateDay, inBirthDateMonth, inBirthDateYear) === false)
    {
        console.log("Birthday validation failed, returning false");

        alert("Please ensure birthday falls within a valid calendar date between 1990 to 2025");
        return false;
    }

    console.log("Birthday validation succeeded");
    console.log("Validating favorite pastime...");

    if (validateFavoritePastime(inFavoritePastime) === false)
    {
        console.log("Favorite pastime validation failed, returning flase");

        alert("Please ensure favorite pastime consists of at least three letters");
        return false;
    }

    console.log("All validations succeeded, returning true");

    return true;
}
