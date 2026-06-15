/* runtimeValidationManager.js: 各入力欄のリアルタイム検証（フォーカス離脱時）
*/

// DOMContentLoaded 時に、リアルタイム検証用のイベントリスナーを設定する
document.addEventListener("DOMContentLoaded", function()
{
    setupRuntimeEventListeners();
});

// 各入力欄にリアルタイム検証用のイベントリスナーを設定する
function setupRuntimeEventListeners()
{
    // ループ処理用に、すべての入力欄 ID のリストを定義
    let inputFieldIds = ["name-input", "phone-number-input", "birthday-day-input", "birthday-month-input", "birthday-year-input", "favorite-pastime-input"];

    // 各入力欄 ID に対応する要素を取得し、blur 時（ユーザーが入力欄から離れたとき）に
    // リアルタイム検証関数を呼び出すイベントリスナーを登録
    for (let currentInputFieldId of inputFieldIds)
    {
        let retrievedField = document.getElementById(currentInputFieldId);

        retrievedField.addEventListener("blur", function()
        {
            validateFieldIsFilled(this);
        });
    }
}

// 入力欄が入力済みかどうかを検証する（blur 時に呼び出される）。未入力なら枠線を赤に、それ以外はデフォルト色に設定
function validateFieldIsFilled(input)
{
    // 前後の空白を除去して空かどうかを判定
    // 空の場合は必須入力であることを示すため枠線を赤に設定
    // trim 後に値があれば、枠線をデフォルト色に戻す
    if (input.value.trim() === "")
    {
        input.style.borderColor = "red";
    }
    else
    {
        input.style.borderColor = "";
    }
}
