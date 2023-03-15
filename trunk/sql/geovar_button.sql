-- Table: public.geovar_button

-- DROP TABLE IF EXISTS public.geovar_button;

CREATE TABLE IF NOT EXISTS public.geovar_button
(
    item_token character varying COLLATE pg_catalog."default",
    post_date timestamp without time zone DEFAULT now(),
    post_modified timestamp without time zone DEFAULT now(),
    post_status character varying COLLATE pg_catalog."default" DEFAULT 'publish'::character varying,
    g_slug character varying COLLATE pg_catalog."default",
    pid integer NOT NULL DEFAULT nextval('geovar_button_pid_seq'::regclass),
    g_label character varying COLLATE pg_catalog."default",
    g_description character varying COLLATE pg_catalog."default",
    g_template character varying COLLATE pg_catalog."default",
    g_faw character varying COLLATE pg_catalog."default",
    g_callback character varying COLLATE pg_catalog."default",
    g_responsive character varying COLLATE pg_catalog."default" DEFAULT 'both'::character varying,
    g_style character varying COLLATE pg_catalog."default",
    g_group json DEFAULT '["private"]'::json,
    CONSTRAINT geovar_button_pkey PRIMARY KEY (pid),
    CONSTRAINT geovar_button_unique3 UNIQUE (item_token)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.geovar_button
    OWNER to gis_database;

COMMENT ON TABLE public.geovar_button
    IS 'live:221114';

-- Trigger: twd_update1_geovar_button

-- DROP TRIGGER IF EXISTS twd_update1_geovar_button ON public.geovar_button;

CREATE TRIGGER twd_update1_geovar_button
    AFTER INSERT
    ON public.geovar_button
    FOR EACH ROW
    EXECUTE FUNCTION public.fwd_update1_geovar_button();

-- Trigger: twd_update3_geovar_button

-- DROP TRIGGER IF EXISTS twd_update3_geovar_button ON public.geovar_button;

CREATE TRIGGER twd_update3_geovar_button
    BEFORE UPDATE 
    ON public.geovar_button
    FOR EACH ROW
    EXECUTE FUNCTION public.fwd_update_post_modified();