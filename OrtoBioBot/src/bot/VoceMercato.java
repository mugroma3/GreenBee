package bot;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import com.botticelli.bot.request.methods.ChatActionToSend;
import com.botticelli.bot.request.methods.MessageToSend;
import com.botticelli.bot.request.methods.PhotoFileToSend;
import com.botticelli.bot.request.methods.PhotoReferenceToSend;
import com.botticelli.bot.request.methods.types.ActionToSend;
import com.botticelli.bot.request.methods.types.Chat;
import com.botticelli.bot.request.methods.types.KeyboardButton;
import com.botticelli.bot.request.methods.types.Message;
import com.botticelli.bot.request.methods.types.ReplyKeyboardMarkupWithButtons;

import apinod.APINod;
import gestionelingue.English;
import gestionelingue.Italiano;
import gestionelingue.Lingue;
import oggettijson.ItemMag;
import oggettijson.Punti;

public class VoceMercato {

	private ItemMag oggetto;
	private OrtoBioBot bot;
	private Message m;
	private StatoUtente stato;
	private static ReplyKeyboardMarkupWithButtons buyMenu;
	private static ReplyKeyboardMarkupWithButtons compraMenu;
	
	public VoceMercato(ItemMag oggetto, Message m, OrtoBioBot bot, StatoUtente stato) {
		this.oggetto = oggetto;
		this.m = m;
		this.stato = stato;
		this.bot = bot;
		VoceMercato.buildMenu();
	}

	public static void buildMenu()
	{
		if(compraMenu == null)
		{
			compraMenu = new ReplyKeyboardMarkupWithButtons(new ArrayList<List<KeyboardButton>>());
			compraMenu.addLine(Italiano.COMPRA, Italiano.NOCOMPRA);
			compraMenu.setResizeKeyboard(true);
			
			buyMenu = new ReplyKeyboardMarkupWithButtons(new ArrayList<List<KeyboardButton>>());
			buyMenu.addLine(English.BUY, English.DONTBUY);
			buyMenu.setResizeKeyboard(true);
		}
	}

	public void sendVoce()
	{
		MessageToSend mts;
		if(oggetto.getTelegramRefImg() == null)
		{
			bot.sendChatAction(new ChatActionToSend(m.getChat().getId(), ActionToSend.UPLOADPHOTO));
			bot.sendPhotoFile(new PhotoFileToSend(m.getChat().getId(), APINod.getIstance().saveImage(oggetto.getImmagine())));
		}
		else
			bot.sendPhotobyReference(new PhotoReferenceToSend(m.getChat().getId(), oggetto.getTelegramRefImg()));
		Punti p = APINod.getIstance().getPunti(m.getFrom().getId());
		
		String testo = Italiano.COMPITI;
		if(stato.getLingua() == Lingue.INGLESE)
			
			testo = English.ADD;
		
		mts = new MessageToSend(m.getChat().getId(), testo);
		
		mts.setReplyMarkup(OrtoBioBot.getBrowseMenu());
		
		bot.sendMessage(mts);
	    
	}

}
