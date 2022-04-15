import { Connection, ConnectionOptions } from 'typeorm';
import { SeedHelper } from '../../../../../common/db/seed';
import { AuthTemplate } from '../../entities/auth.entity.templates';
import { AuthUser } from '@movit/api/auth';

export class InitialLayoutSeeds extends SeedHelper {
  migrationName: string = this.constructor.name;

  migrationDelay = 5000;

  templates: Partial<AuthTemplate>[] = [
    {
      name: 'pw:reset',
      title: 'Passwort zurücksetzen',
      template: `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Passwort zurücksetzten</title>
    <link href='https://fonts.googleapis.com/css?family=Asap:400,400italic,700,700italic' rel='stylesheet' type='text/css'>
    <style type="text/css">
        .social-icons-list{
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
        }
        .social-icons-list a {
            color: #fff;
        }
        .social-icons-list img {
            max-width: 25px;
        }
        .social-icons-list-item{
            margin: 10px;
            margin-top: 0;
            margin-bottom: 0;
            min-width: 25px;
        }
        @media only screen and (min-width:768px){
            .templateContainer{
                width:600px !important;
            }

        }   @media only screen and (max-width: 480px){
            body,table,td,p,a,li,blockquote{
                -webkit-text-size-adjust:none !important;
            }

        }   @media only screen and (max-width: 480px){
            body{
                width:100% !important;
                min-width:100% !important;
            }

        }   @media only screen and (max-width: 480px){
            #bodyCell{
                padding-top:10px !important;
            }

        }   @media only screen and (max-width: 480px){
            .mcnImage{
                width:100% !important;
            }

        }   @media only screen and (max-width: 480px){

            .mcnCaptionTopContent,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer{
                max-width:100% !important;
                width:100% !important;
            }

        }   @media only screen and (max-width: 480px){
            .mcnBoxedTextContentContainer{
                min-width:100% !important;
            }

        }   @media only screen and (max-width: 480px){
            .mcnImageGroupContent{
                padding:9px !important;
            }

        }   @media only screen and (max-width: 480px){
            .mcnCaptionLeftContentOuter
            .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{
                padding-top:9px !important;
            }

        }   @media only screen and (max-width: 480px){
            .mcnImageCardTopImageContent,.mcnCaptionBlockInner
            .mcnCaptionTopContent:last-child .mcnTextContent{
                padding-top:18px !important;
            }

        }   @media only screen and (max-width: 480px){
            .mcnImageCardBottomImageContent{
                padding-bottom:9px !important;
            }

        }   @media only screen and (max-width: 480px){
            .mcnImageGroupBlockInner{
                padding-top:0 !important;
                padding-bottom:0 !important;
            }

        }   @media only screen and (max-width: 480px){
            .mcnImageGroupBlockOuter{
                padding-top:9px !important;
                padding-bottom:9px !important;
            }

        }   @media only screen and (max-width: 480px){
            .mcnTextContent,.mcnBoxedTextContentColumn{
                padding-right:18px !important;
                padding-left:18px !important;
            }

        }   @media only screen and (max-width: 480px){
            .mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{
                padding-right:18px !important;
                padding-bottom:0 !important;
                padding-left:18px !important;
            }

        }   @media only screen and (max-width: 480px){
            .mcpreview-image-uploader{
                display:none !important;
                width:100% !important;
            }

        }   @media only screen and (max-width: 480px){
            /*
            @tab Mobile Styles
            @section Heading 1
            @tip Make the first-level headings larger in size for better readability
         on small screens.
            */
            h1{
                /*@editable*/font-size:20px !important;
                /*@editable*/line-height:150% !important;
            }

        }   @media only screen and (max-width: 480px){
            /*
            @tab Mobile Styles
            @section Heading 2
            @tip Make the second-level headings larger in size for better
         readability on small screens.
            */
            h2{
                /*@editable*/font-size:20px !important;
                /*@editable*/line-height:150% !important;
            }

        }   @media only screen and (max-width: 480px){
            /*
            @tab Mobile Styles
            @section Heading 3
            @tip Make the third-level headings larger in size for better readability
         on small screens.
            */
            h3{
                /*@editable*/font-size:18px !important;
                /*@editable*/line-height:150% !important;
            }

        }   @media only screen and (max-width: 480px){
            /*
            @tab Mobile Styles
            @section Heading 4
            @tip Make the fourth-level headings larger in size for better
         readability on small screens.
            */
            h4{
                /*@editable*/font-size:16px !important;
                /*@editable*/line-height:150% !important;
            }

        }   @media only screen and (max-width: 480px){
            /*
            @tab Mobile Styles
            @section Boxed Text
            @tip Make the boxed text larger in size for better readability on small
         screens. We recommend a font size of at least 16px.
            */
            .mcnBoxedTextContentContainer
            .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{
                /*@editable*/font-size:16px !important;
                /*@editable*/line-height:150% !important;
            }

        }   @media only screen and (max-width: 480px){
            /*
            @tab Mobile Styles
            @section Preheader Visibility
            @tip Set the visibility of the email's preheader on small screens. You
         can hide it to save space.
            */
            #templatePreheader{
                /*@editable*/display:block !important;
            }

        }   @media only screen and (max-width: 480px){
            /*
            @tab Mobile Styles
            @section Preheader Text
            @tip Make the preheader text larger in size for better readability on
         small screens.
            */
            #templatePreheader .mcnTextContent,#templatePreheader
            .mcnTextContent p{
                /*@editable*/font-size:12px !important;
                /*@editable*/line-height:150% !important;
            }

        }   @media only screen and (max-width: 480px){
            /*
            @tab Mobile Styles
            @section Header Text
            @tip Make the header text larger in size for better readability on small
         screens.
            */
            #templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
                /*@editable*/font-size:16px !important;
                /*@editable*/line-height:150% !important;
            }

        }   @media only screen and (max-width: 480px){
            /*
            @tab Mobile Styles
            @section Body Text
            @tip Make the body text larger in size for better readability on small
         screens. We recommend a font size of at least 16px.
            */
            #templateBody .mcnTextContent,#templateBody .mcnTextContent p{
                /*@editable*/font-size:16px !important;
                /*@editable*/line-height:150% !important;
            }

        }   @media only screen and (max-width: 480px){
            /*
            @tab Mobile Styles
            @section Footer Text
            @tip Make the footer content text larger in size for better readability
         on small screens.
            */
            #templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
                /*@editable*/font-size:12px !important;
                /*@editable*/line-height:150% !important;
            }

        }
    </style>
</head>
<body style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #dfdbd5; height: 100%; margin: 0; padding: 0; width: 100%">
<center>
    <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" id="bodyTable" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #dfdbd5; height: 100%; margin: 0; padding: 0; width: 100%" width="100%">
        <tr>
            <td align="center" id="bodyCell" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-top: 0; height: 100%; margin: 0; padding: 0; width: 100%" valign="top">
                <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                    <tr>
                        <td align="center" valign="top" width="600" style="width:600px;">
                            <table border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; max-width: 600px; border: 0" width="100%">
                                <tr>
                                    <td id="templatePreheader" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #dfdbd5; border-top: 0; border-bottom: 0; padding-top: 16px; padding-bottom: 8px" valign="top">
                                        <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                                            <tbody class="mcnTextBlockOuter">
                                            <tr>
                                                <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                                                    <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                                                        <tbody>
                                                        <tr>
                                                            <td class="mcnTextContent" style='mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word; color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 12px; line-height: 150%; text-align: center; padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;' valign="top">
                                                                <a href="[WEBSITE]" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: #2a2a2a; font-weight: normal; text-decoration: none" target="_blank" title="Logo"><img align="none" alt="Logo" src="[LOGO]" style="-ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; height: auto; height: 40px; margin: 0px;" height="40"></a>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="templateHeader" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #f7f7ff; border-top: 0; border-bottom: 0; padding-top: 16px; padding-bottom: 0" valign="top">
                                        <table border="0" cellpadding="0" cellspacing="0" class="mcnImageBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                                            <tbody class="mcnImageBlockOuter">
                                            <tr>
                                                <td class="mcnImageBlockInner" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding:0px" valign="top">
                                                    <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                                                        <tbody>
                                                        <tr>
                                                            <td class="mcnImageContent" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-right: 0px; padding-left: 0px; padding-top: 0; padding-bottom: 0; text-align:center;" valign="top">
                                                                <a class="" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: #fe5147; font-weight: normal; text-decoration: none" target="_blank" title=""></a> <a class="" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: #fe5147; font-weight: normal; text-decoration: none" target="_blank" title=""><img align="center" alt="Passwort vergessen?" class="mcnImage" src="https://i.ibb.co/8BYKzfF/fgp.png" style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none; text-decoration: none; vertical-align: bottom; max-width:1200px; padding-bottom: 0; display: inline !important; vertical-align: bottom;" width="600"></a>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="templateBody" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #f7f7ff; border-top: 0; border-bottom: 0; padding-top: 0; padding-bottom: 0" valign="top">
                                        <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                                            <tbody class="mcnTextBlockOuter">
                                            <tr>
                                                <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                                                    <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                                                        <tbody>
                                                        <tr>
                                                            <td class="mcnTextContent" style='mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word; color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 16px; line-height: 150%; text-align: center; padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;' valign="top">
                                                                <h1 class="null" style='color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 32px; font-style: normal; font-weight: bold; line-height: 125%; letter-spacing: 2px; text-align: center; display: block; margin: 0; padding: 0'><span style="text-transform:uppercase">Passwort</span></h1>
                                                                <h2 class="null" style='color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 24px; font-style: normal; font-weight: bold; line-height: 125%; letter-spacing: 1px; text-align: center; display: block; margin: 0; padding: 0'><span style="text-transform:uppercase">vergessen?</span></h2>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                                            <tbody class="mcnTextBlockOuter">
                                            <tr>
                                                <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                                                    <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                                                        <tbody>
                                                        <tr>
                                                            <td class="mcnTextContent" style='mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word; color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 16px; line-height: 150%; text-align: center; padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;' valign="top">Keine Sorge, wir helfen Dir weiter!<br>
                                                                Erstelle Dir jetzt Dein neues wunsch Passwort.<br></td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                                            <tbody class="mcnButtonBlockOuter">
                                            <tr>
                                                <td align="center" class="mcnButtonBlockInner" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top:18px; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top">
                                                    <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                                                        <tbody class="mcnButtonBlockOuter">
                                                        <tr>
                                                            <td align="center" class="mcnButtonBlockInner" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top">
                                                                <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonContentContainer" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-collapse: separate !important;border-radius: 48px;background-color: #fe5147;">
                                                                    <tbody>
                                                                    <tr>
                                                                        <td align="center" class="mcnButtonContent" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; font-family: 'Asap', Helvetica, sans-serif; font-size: 16px; padding-top:24px; padding-right:48px; padding-bottom:24px; padding-left:48px;" valign="middle">
                                                                            <a class="mcnButton" href="[LINK]" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; display: block; color: #fe5147; font-weight: normal; text-decoration: none; font-weight: normal;letter-spacing: 1px;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF; text-transform:uppercase;" target="_blank" title="Link invitation">Jetzt zurücksetzen</a>
                                                                        </td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table><small style="color:#000000;opacity: 0.4;font-family: 'Asap', Helvetica, sans-serif;margin-top: 5px"><a>Hinweis:</a> Du solltest Dein Passwort niemals jemandem mitteilen</small>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <table border="0" cellpadding="0" cellspacing="0" class="mcnImageBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                                            <tbody class="mcnImageBlockOuter">
                                            <tr>
                                                <td class="mcnImageBlockInner" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding:0px" valign="top">
                                                    <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                                                        <tbody>
                                                        <tr>
                                                            <td class="mcnImageContent" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-right: 0px; padding-left: 0px; padding-top: 0; padding-bottom: 0; text-align:center;" valign="top"></td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td id="templateFooter" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #dfdbd5; border-top: 0; border-bottom: 0; padding-top: 8px; padding-bottom: 80px" valign="top">
                                        <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                                            <tbody class="mcnTextBlockOuter">
                                            <tr>
                                                <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                                                    <table align="center" bgcolor="#F7F7FF" border="0" cellpadding="32" cellspacing="0" class="card" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background:#F7F7FF; margin:auto; text-align:left; max-width:600px; font-family: 'Asap', Helvetica, sans-serif;" text-align="left" width="100%">
                                                        <tr>
                                                            <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%">
                                                                <h3 style='color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 20px; font-style: normal; font-weight: normal; line-height: 125%; letter-spacing: normal; text-align: center; display: block; margin: 0; padding: 0; text-align: left; width: 100%; font-size: 16px; font-weight: bold;'>Fragen?<br>
                                                                    Ruf uns einfach an.</h3>
                                                                <p style='margin: 10px 0; padding: 0; mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 12px; line-height: 150%; text-align: left; text-align: left; font-size: 14px;'>Wir laden Dich ein zu einem unverbindlichen Gespräch. Frage unsere Experten nach Rat. Bei uns findest Du einfach passende Online-Lösungen für mehr Erfolg.<br>
                                                                    Und womöglich einen langjährigen, zuverlässigen Partner. Wir würden uns freuen!</p>
                                                                <div style="padding-bottom: 18px;">
                                                                    <a style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: #fe5147; font-weight: normal; text-decoration: none; font-size: 14px; color:#fe5147; text-decoration:none;" target="_blank" title="Kontakt">Mehr ❯</a>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                                                        <tbody>
                                                        <tr>
                                                            <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 24px; padding-right: 18px; padding-bottom: 24px; padding-left: 18px; color: #7F6925; font-family: 'Asap', Helvetica, sans-serif; font-size: 12px;" valign="top">
                                                                <div style="text-align: center;">
                                                                    Made with <a href="[DOMAIN]" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: #fe5147; font-weight: normal; text-decoration: none" target="_blank"><img style="width: 10px; padding-left: 2px; padding-right: 2px; position: relative; top: 1px;" src="https://i.ibb.co/Qbt9tLq/svg-heart.png" alt="svg-heart"></a>by <a href="[DOMAIN]" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: #fe5147; font-weight: normal; text-decoration: none; color:#7F6925;" target="_blank" title="">[COMPANY]</a>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                    <table align="center" border="0" cellpadding="12" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                                                        <tbody>
                                                        <tr class="w-100" style="width: 100%">
                                                            <td colspan="100%" style="width: 100%">
                                                                <section class="widget social_icons-3 social-icons">
                                                                    <ul class="social-icons-list">
                                                                        <li class="social-icons-list-item">
                                                                            <a class="social-icons-list-link icon-facebook" href="https://www.facebook.com/" target="_blank" rel="noreferrer noopener" title="Facebook" aria-label="Facebook (opens in a new tab)"><img src="https://i.ibb.co/6XFdg0r/fb.png" alt="fb"></a>
                                                                        </li>
                                                                        <li class="social-icons-list-item">
                                                                            <a class="social-icons-list-link icon-instagram" href="https://www.instagram.com/" target="_blank" rel="noreferrer noopener" title="Instagram" aria-label="Instagram (opens in a new tab)"><img src="https://i.ibb.co/vQgVKBq/instagram.png" alt="instagram"></a>
                                                                        </li>
                                                                        <li class="social-icons-list-item">
                                                                            <a class="social-icons-list-link icon-linkedin" href="https://ch.linkedin.com/company/" target="_blank" rel="noreferrer noopener" title="LinkedIn" aria-label="LinkedIn (opens in a new tab)"><img src="https://i.ibb.co/sHKLgYy/linkedin.png" alt="linkedin"></a>
                                                                        </li>
                                                                        <li class="social-icons-list-item">
                                                                            <a class="social-icons-list-link icon-whatsapp-url" href="https://wa.me/message/" target="_blank" rel="noreferrer noopener" title="WhatsApp (URL)" aria-label="WhatsApp (URL) (opens in a new tab)"><img src="https://i.ibb.co/93nFK2d/whatsapp.png" alt="whatsapp"></a>
                                                                        </li>
                                                                    </ul>
                                                                </section>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</center>
</body>
</html>`,
      lang: 'de',
    },
    {
      name: 'invitation:code',
      template: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Sie wurde eingeladen</title>
</head>
<body>
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Sie wurde eingeladen</title><!--[if !mso]>
      <!== -->
    <link href="https://fonts.googleapis.com/css?family=Asap:400,400italic,700,700italic" rel="stylesheet" type="text/css"><!--<![endif]-->

    <style type="text/css">
        .social-icons-list{
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
        }
        .social-icons-list a {
            color: #fff;
        }
        .social-icons-list img {
            max-width: 25px;
        }
        .social-icons-list-item{
            margin: 10px;
            margin-top: 0;
            margin-bottom: 0;
            min-width: 25px;
        }
        @media only screen and (min-width:768px){
            .templateContainer{
                width:600px !important;
            }

        }   @media only screen and (max-width: 480px){
            body,table,td,p,a,li,blockquote{
                -webkit-text-size-adjust:none !important;
            }

        }   @media only screen and (max-width: 480px){
            body{
                width:100% !important;
                min-width:100% !important;
            }

        }   @media only screen and (max-width: 480px){
            #bodyCell{
                padding-top:10px !important;
            }

        }   @media only screen and (max-width: 480px){
            .mcnImage{
                width:100% !important;
            }

        }   @media only screen and (max-width: 480px){

            .mcnCaptionTopContent,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer{
                max-width:100% !important;
                width:100% !important;
            }

        }   @media only screen and (max-width: 480px){
            .mcnBoxedTextContentContainer{
                min-width:100% !important;
            }

        }   @media only screen and (max-width: 480px){
            .mcnImageGroupContent{
                padding:9px !important;
            }

        }   @media only screen and (max-width: 480px){
            .mcnCaptionLeftContentOuter
            .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{
                padding-top:9px !important;
            }

        }   @media only screen and (max-width: 480px){
            .mcnImageCardTopImageContent,.mcnCaptionBlockInner
            .mcnCaptionTopContent:last-child .mcnTextContent{
                padding-top:18px !important;
            }

        }   @media only screen and (max-width: 480px){
            .mcnImageCardBottomImageContent{
                padding-bottom:9px !important;
            }

        }   @media only screen and (max-width: 480px){
            .mcnImageGroupBlockInner{
                padding-top:0 !important;
                padding-bottom:0 !important;
            }

        }   @media only screen and (max-width: 480px){
            .mcnImageGroupBlockOuter{
                padding-top:9px !important;
                padding-bottom:9px !important;
            }

        }   @media only screen and (max-width: 480px){
            .mcnTextContent,.mcnBoxedTextContentColumn{
                padding-right:18px !important;
                padding-left:18px !important;
            }

        }   @media only screen and (max-width: 480px){
            .mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{
                padding-right:18px !important;
                padding-bottom:0 !important;
                padding-left:18px !important;
            }

        }   @media only screen and (max-width: 480px){
            .mcpreview-image-uploader{
                display:none !important;
                width:100% !important;
            }

        }   @media only screen and (max-width: 480px){
            /*
            @tab Mobile Styles
            @section Heading 1
            @tip Make the first-level headings larger in size for better readability
         on small screens.
            */
            h1{
                /*@editable*/font-size:20px !important;
                /*@editable*/line-height:150% !important;
            }

        }   @media only screen and (max-width: 480px){
            /*
            @tab Mobile Styles
            @section Heading 2
            @tip Make the second-level headings larger in size for better
         readability on small screens.
            */
            h2{
                /*@editable*/font-size:20px !important;
                /*@editable*/line-height:150% !important;
            }

        }   @media only screen and (max-width: 480px){
            /*
            @tab Mobile Styles
            @section Heading 3
            @tip Make the third-level headings larger in size for better readability
         on small screens.
            */
            h3{
                /*@editable*/font-size:18px !important;
                /*@editable*/line-height:150% !important;
            }

        }   @media only screen and (max-width: 480px){
            /*
            @tab Mobile Styles
            @section Heading 4
            @tip Make the fourth-level headings larger in size for better
         readability on small screens.
            */
            h4{
                /*@editable*/font-size:16px !important;
                /*@editable*/line-height:150% !important;
            }

        }   @media only screen and (max-width: 480px){
            /*
            @tab Mobile Styles
            @section Boxed Text
            @tip Make the boxed text larger in size for better readability on small
         screens. We recommend a font size of at least 16px.
            */
            .mcnBoxedTextContentContainer
            .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{
                /*@editable*/font-size:16px !important;
                /*@editable*/line-height:150% !important;
            }

        }   @media only screen and (max-width: 480px){
            /*
            @tab Mobile Styles
            @section Preheader Visibility
            @tip Set the visibility of the email's preheader on small screens. You
         can hide it to save space.
            */
            #templatePreheader{
                /*@editable*/display:block !important;
            }

        }   @media only screen and (max-width: 480px){
            /*
            @tab Mobile Styles
            @section Preheader Text
            @tip Make the preheader text larger in size for better readability on
         small screens.
            */
            #templatePreheader .mcnTextContent,#templatePreheader
            .mcnTextContent p{
                /*@editable*/font-size:12px !important;
                /*@editable*/line-height:150% !important;
            }

        }   @media only screen and (max-width: 480px){
            /*
            @tab Mobile Styles
            @section Header Text
            @tip Make the header text larger in size for better readability on small
         screens.
            */
            #templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
                /*@editable*/font-size:16px !important;
                /*@editable*/line-height:150% !important;
            }

        }   @media only screen and (max-width: 480px){
            /*
            @tab Mobile Styles
            @section Body Text
            @tip Make the body text larger in size for better readability on small
         screens. We recommend a font size of at least 16px.
            */
            #templateBody .mcnTextContent,#templateBody .mcnTextContent p{
                /*@editable*/font-size:16px !important;
                /*@editable*/line-height:150% !important;
            }

        }   @media only screen and (max-width: 480px){
            /*
            @tab Mobile Styles
            @section Footer Text
            @tip Make the footer content text larger in size for better readability
         on small screens.
            */
            #templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
                /*@editable*/font-size:12px !important;
                /*@editable*/line-height:150% !important;
            }

        }
    </style>
  </head>
  <center>
    <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" id="bodyTable" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #dfdbd5; height: 100%; margin: 0; padding: 0; width: 100%" width="100%">
      <tr>
        <td align="center" id="bodyCell" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-top: 0; height: 100%; margin: 0; padding: 0; width: 100%" valign="top">
          <!-- BEGIN TEMPLATE // -->
          <!--[if gte mso 9]>
                <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                    <tr>
                        <td align="center" valign="top" width="600" style="width:600px;">
                <![endif]-->
          <table border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; max-width: 600px; border: 0" width="100%">
            <tr>
              <td id="templatePreheader" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #dfdbd5; border-top: 0; border-bottom: 0; padding-top: 16px; padding-bottom: 8px" valign="top">
                <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                  <tbody class="mcnTextBlockOuter">
                    <tr>
                      <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                        <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                          <tbody>
                            <tr>
                              <td class="mcnTextContent" style='mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word; color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 12px; line-height: 150%; text-align: center; padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;' valign="top">
                                <a href="[WEBSITE]" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: #2a2a2a; font-weight: normal; text-decoration: none" target="_blank" title=""><img align="none" alt=" Logo" src="[LOGO]" style="-ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; height: auto; height: 60px; margin: 0px;" height="60"></a><br>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td id="templateHeader" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #f7f7ff; border-top: 0; border-bottom: 0; padding-top: 16px; padding-bottom: 0" valign="top">
                <table border="0" cellpadding="0" cellspacing="0" class="mcnImageBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                  <tbody class="mcnImageBlockOuter">
                    <tr>
                      <td class="mcnImageBlockInner" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding:0px" valign="top">
                        <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                          <tbody>
                            <tr>
                              <td class="mcnImageContent" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-right: 0px; padding-left: 0px; padding-top: 0; padding-bottom: 0; text-align:center;" valign="top">
                                <a class="" href="[WEBSITE]" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: #fe5147; font-weight: normal; text-decoration: none" target="_blank" title=""></a> <a class="" href="[WEBSITE]" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: #fe5147; font-weight: normal; text-decoration: none" target="_blank" title=""></a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td id="templateBody" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #f7f7ff; border-top: 0; border-bottom: 0; padding-top: 0; padding-bottom: 0" valign="top">
                <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                  <tbody class="mcnTextBlockOuter">
                    <tr>
                      <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                        <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                          <tbody>
                            <tr>
                              <td class="mcnTextContent" style='mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word; color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 16px; line-height: 150%; text-align: center; padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;' valign="top">
                                <h1 class="null" style='color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 32px; font-style: normal; font-weight: bold; line-height: 125%; letter-spacing: 2px; text-align: center; display: block; margin: 0; padding: 0'><span style="text-transform:uppercase">Neue Einladung!</span></h1>
                                <h2 class="null" style='color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 24px; font-style: normal; font-weight: bold; line-height: 125%; letter-spacing: 1px; text-align: center; display: block; margin: 0; padding: 0'></h2>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                  <tbody class="mcnTextBlockOuter">
                    <tr>
                      <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                        <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                          <tbody>
                            <tr>
                              <td class="mcnTextContent" style='mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word; color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 16px; line-height: 150%; text-align: center; padding-top:9px; padding-right: 18px; padding-bottom: 9px; padding-left: 18px;' valign="top">Sie wurden von XY eingeladen.<br>
                              <br></td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                  <tbody class="mcnButtonBlockOuter">
                    <tr>
                      <td align="center" class="mcnButtonBlockInner" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top:18px; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top">
                        <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                          <tbody class="mcnButtonBlockOuter">
                            <tr>
                              <td align="center" class="mcnButtonBlockInner" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top">
                                <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonContentContainer" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-collapse: separate !important;border-radius: 48px;background-color: #fe5147;">
                                  <tbody>
                                    <tr>
                                      <td align="center" class="mcnButtonContent" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; font-family: 'Asap', Helvetica, sans-serif; font-size: 16px; padding-top:24px; padding-right:48px; padding-bottom:24px; padding-left:48px;" valign="middle">
                                        <a class="mcnButton" href="[LINK]" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; display: block; color: #fe5147; font-weight: normal; text-decoration: none; font-weight: normal;letter-spacing: 1px;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF; text-transform:uppercase;" target="_blank" title="Link invitation">Jetzt Überprüffen</a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table border="0" cellpadding="0" cellspacing="0" class="mcnImageBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                  <tbody class="mcnImageBlockOuter">
                    <tr>
                      <td class="mcnImageBlockInner" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding:0px" valign="top">
                        <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                          <tbody>
                            <tr>
                              <td class="mcnImageContent" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-right: 0px; padding-left: 0px; padding-top: 0; padding-bottom: 0; text-align:center;" valign="top"></td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td id="templateFooter" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #dfdbd5; border-top: 0; border-bottom: 0; padding-top: 8px; padding-bottom: 80px" valign="top">
                <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                  <tbody class="mcnTextBlockOuter">
                    <tr>
                      <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                          <tbody>
                            <tr>
                              <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 24px; padding-right: 18px; padding-bottom: 24px; padding-left: 18px; color: #7F6925; font-family: 'Asap', Helvetica, sans-serif; font-size: 12px;" valign="top">
                                <div style="text-align: center;">
                                  Made with <a style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: #fe5147; font-weight: normal; text-decoration: none" target="_blank"><img style="width: 10px; padding-left: 2px; padding-right: 2px; position: relative; top: 1px;" src="https://i.ibb.co/Qbt9tLq/svg-heart.png" alt="svg-heart"></a> by <a href="[WEBSITE]" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: #fe5147; font-weight: normal; text-decoration: none; color:#7F6925;" target="_blank" title="Team">[COMPANY]</a>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table align="center" border="0" cellpadding="12" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                          <tbody>
                            <tr class="w-100" style="width: 100%">
                              <td colspan="100%" style="width: 100%">
                                <section class="widget social_icons-3 social-icons"></section>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </table><!-- // END TEMPLATE -->
        </td>
      </tr>
    </table>
  </center>
</body>
</html>`,
      lang: 'de',
    },
    {
      name: 'welcome',
      template: ``,
      lang: 'de',
    },
  ];

  static getUserData() {
    return {
      email: process.env.APP_DEFAULT_USER,
      password: process.env.APP_DEFAULT_PASSWORD,
    };
  }

  public exists(template: Partial<AuthTemplate>) {
    return AuthTemplate.findOne({
      where: {
        name: template.name,
        lang: template.lang,
        title: template.title,
      },
    });
  }

  public async doSeed(queryRunner: Connection): Promise<boolean> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise<boolean>(async (resolve) => {
      for (let i = 0; i < this.templates.length; i++) {
        const template = AuthTemplate.create().initialise(this.templates[i]);
        if (!(await this.exists(template))) await template.save();
        return resolve(true);
      }
    });
  }
}
