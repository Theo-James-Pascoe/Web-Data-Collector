/* birthdayValidator.js: 生年月日の入力検証
*/

// 生年月日検証の入口関数。各生年月日入力欄の検証を実行する
// いずれかが無効な場合は false、すべて有効な場合は true を返す
function validateBirthday(inDay, inMonth, inYear)
{
    /* 各生年月日入力欄について:
        - 該当する検証関数を呼び出す
        - 失敗した場合は false を返す。成功した場合は次の検証へ進む
        - すべて成功した場合は true を返す
    */
    console.log("Checking if birthday fields are valid integers...");

    if (validateBirthdayFieldsAsInts([inDay, inMonth, inYear]) === false)
    {
        console.log("Birthday fields were not all valid integers, returning false");
        return false;
    }

    // 整数として妥当であることを確認したうえで整数に変換し、
    // 比較時の型不一致やエラーを防ぐ
    let dayAsInt = parseInt(inDay, 10);
    let monthAsInt = parseInt(inMonth, 10);
    let yearAsInt = parseInt(inYear, 10);

    // 日の検証には有効な年・月が必要なため、日より先に年と月を検証する

    console.log("Birthday field integer validation succeeded");
    console.log("Validating birthday year...")

    if (validateBirthDateYear(yearAsInt) === false)
    {
        console.log("Birthday year was not valid, returning false");
        return false;
    }

    console.log("Birthday year validation suceeded");
    console.log("Validating birthday month...");

    if (validateBirthDateMonth(monthAsInt) === false)
    {
        console.log("Birthday month was not valid, returning false");
        return false;
    }

    console.log("Birthday month validation succeeded");
    console.log("Validating birthday day...");

    if (validateBirthDateDay(dayAsInt, monthAsInt, yearAsInt) === false)
    {
        console.log("Birthday day was not valid, returning false");
        return false;
    }

    console.log("All birthday validations succeeded");

    return true;
}

// 生年月日入力欄がすべて整数として解釈できるかを確認する
// すべて整数として妥当な場合は true、そうでない場合は false を返す
function validateBirthdayFieldsAsInts(fields)
{
    // いずれかの入力欄が NaN なら false、それ以外は true を返す
    for (let currentField of fields)
    {
        if (isNaN(currentField))
        {
            console.log(currentField + " was NaN");

            return false;
        }
    }

    return true;
}

// 年の入力欄が有効かを確認する
// 有効な場合は true、無効な場合は false を返す
function validateBirthDateYear(year)
{
    // 有効範囲の下限（1900年）未満、または未来年（本課題では2025年超）の場合は false、それ以外は true

    // 現在確認されている最長寿者は1908年生まれだが、ユーザーにとって分かりやすいよう
    // 下限は端数のない年（1900年）とした
    if (year < 1900 || year > 2025)
    {
        console.log(year + " was not inside the valid birth year range of 1900-2025");

        return false;
    }

    return true;
}

// 月の入力欄が有効かを確認する（将来の変更に備えた防御的チェックとしても使用）
// 有効な場合は true、無効な場合は false を返す
function validateBirthDateMonth(month)
{
    // 月が有効範囲（1〜12）内なら true、それ以外は false

    // 1年は12か月あり、月の値は1〜12の整数で表される。範囲外の値は実在する月に対応しないため無効
    if (month < 1 || month > 12)
    {
        console.log(month + " was not inside the valid birth month range of 1-12");

        return false;
    }

    return true;
}

// 日の入力欄が有効かを確認する
// 有効な場合は true、無効な場合は false を返す
function validateBirthDateDay(day, month, year)
{
    // 指定された年・月における日数を求める
    // 閏年により2月の日数が変わるため、年も必要
    let daysInMonth = checkDaysInMonth(month, year);

    // 日が0以下（各月は最低1日）または月の日数を超える場合は無効（false）
    // それ以外は有効（true）
    if (day <= 0 || day > daysInMonth)
    {
        console.log(day + " was not inside the valid day range for month " + month + " (1 - " + daysInMonth + ") in the year " + year);

        return false;
    }

    return true;
}

// 指定年・月の日数を返す（日の入力欄の検証で使用）
function checkDaysInMonth(month, year)
{
    /* 現行版では validateBirthday() 内で月の検証を先に行ってからこの関数が呼ばれるため、
       現行の呼び出し順では、この if 分岐にはほぼ入らない。

       ただし実運用では呼び出し順が変わり、月の検証前にこの関数が呼ばれる可能性がある。
       そのような変更に備え、防御的に月の妥当性チェックをここにも含めている
    */
    if (validateBirthDateMonth(month) === false)
    {
        console.log("An invalid month (" + month + ") was passed to checkDaysInMonth(). This means that changes to the code have occured somewhere such that" +
            " invalid months are not checked before checkDaysInMonth() is called.");

        return;
    }

    // 月に応じた日数を返す switch 文

    // 31日の月より30日の月の方が少ないため、30日の月を個別 case で判定する
    // 31日の月は default にまとめ、個別 case を減らす
    switch(month)
    {
        case 2:
            // 2月の日数は閏年の影響を受けるため、閏年かどうかを判定
            let leapYearStatus = checkIfLeapYear(year);

            // 閏年でなければ28日（平年の2月）、閏年なら29日
            if (leapYearStatus === false)
            {
                console.log("February in the leap year " + year + " has 29 days. Returning 29");

                return 28;
            }

            console.log("February in the year " + year + " has 28 days. Returning 28");

            return 29;
        case 4:
            console.log("Returning 30 days for April");

            return 30;
        case 6:
            console.log("Returning 30 days for June");

            return 30;
        case 9:
            console.log("Returning 30 days for September");

            return 30;
        case 11:
            console.log("Returning 30 days for November");

            return 30;
        // 31日の月はこの default に含まれる
        // 月の検証はこの関数より前に行われるため、無効な月では default には到達しない
        default:
            console.log("Returning 31 days for month number " + month);

            return 31;
    }
}

// 指定年が閏年かどうかを判定する（2月の case で使用）
// 閏年なら true、平年なら false を返す
function checkIfLeapYear(year)
{
    /* 閏年のルール
        - 4で割り切れる年は閏年の候補
        - 100で割り切れる年は閏年にならない（400で割り切れる場合を除く）
    */

    // 上記ルールに従い閏年かを判定。すべて満たす場合は true、それ以外は false
    if (year % 4 === 0)
    {
        console.log(year + " was deterimined to be divisible by 4. Proceeding with leap year checks...");

        if ((year % 100 !== 0) || (year % 400 === 0))
        {
            console.log(year + " was determined to be a leap year");

            return true;
        }
    }

    console.log(year + " was not determined to be a leap year");

    return false;
}
