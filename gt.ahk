#q::
  GoogleTranslate()
return

; Google 翻译
GuiEscape:
GuiClose:
Button确定:
  Gui Destroy
  return
  
GoogleTranslate()
{
  def := Clipboard
  InputBox, word, 单词, 请输入要翻译的单词,,,,,,,,%def%
  ; Run, "WScript.exe" "gt.js" "%word%"

  shell := ComObjCreate("WScript.Shell")
  exec := shell.Exec("CScript.exe //Nologo gt.js """ . word . """")
  text := exec.StdOut.ReadAll()

  Gui Add, Edit, w800 h600, %text%
  Gui Add, Button, Default, 确定
  Gui Show, , %word% 翻译结果 (按ESC关闭)
  GuiControl Focus, okButton
}
