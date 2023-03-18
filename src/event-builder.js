class EventBuilder {
  #template =
    'https://www.google.com/calendar/render?action=TEMPLATE&text={title}&dates={dates}}';
  #sugar = Sugar.Date;

  /**
   * @text: a String like "eat some tacos on friday at 9"
   * @delaysEvent: Google Calendar always sets a default notification 30 minutes before the event
   * time. To be notified at the exact event time we can delay the event by 30 minutes.
   */
  getEventURL(text = '', delaysEvent = false) {
    text = text.trim();

    if (text === '') text = 'Event now';

    // get an object with the event title, start date and end date
    const parsed = Sherlock.parse(text);

    if (parsed.startDate === null) parsed.startDate = new Date();
    if (delaysEvent) this.#sugar.advance(parsed.startDate, '30 minutes');

    // events usually dont have an end date, so it's gonna be null
    if (parsed.endDate === null) {
      const endDate = new Date(parsed.startDate);
      parsed.endDate = this.#sugar.advance(endDate, '15 minutes');
    }

    const title = parsed.eventTitle || 'Event';
    const startDate = this.#sugar(parsed.startDate).format(
      '{year}{MM}{dd}T%H%M%S'
    );
    const endDate = this.#sugar(parsed.endDate).format('{year}{MM}{dd}T%H%M%S');

    const url = this.#template
      .replace('{title}', encodeURI(title))
      .replace('{dates}', startDate + '/' + endDate);

    return url;
  }
}
