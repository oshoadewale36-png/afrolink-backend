const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/create-subscription', auth, async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [{ price: 'price_xxx', quantity: 1 }], // Create price in Stripe dashboard
            success_url: 'https://yourfrontend.com/success',
            cancel_url: 'https://yourfrontend.com/cancel',
            metadata: { userId: req.userId }
        });
        res.json({ url: session.url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Webhook for fulfillment
router.post('/webhook', async (req, res) => {
    // Verify signature + update user.isPremium
    const isValid = true;
    if (!isValid) {
        return res.status(400).send('Webhook verification failed');
    }
    res.sendStatus(200);
});